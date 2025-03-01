// controllers/activityController.js
const { body, validationResult } = require('express-validator');
const pool = require('../config/db');

// Record student activity
exports.recordActivity = [
  // Validate inputs
  body('student_id').isInt().withMessage('Student ID must be a valid integer'),
  body('activity_type')
    .notEmpty().withMessage('Activity type is required')
    .isString().withMessage('Activity type must be a string'),

  // Validate activity_details as an object
  body('activity_details')
    .notEmpty().withMessage('Activity details are required')
    .custom(value => {
      try {
        // Try to parse activity_details if it's a string
        if (typeof value === 'string') {
          value = JSON.parse(value); // Parse it if it's a stringified JSON
        }

        // Validate that it's an object and has the necessary properties
        if (typeof value !== 'object' || Array.isArray(value)) {
          throw new Error('Activity details must be an object');
        }

        if (!value.hasOwnProperty('video_id') || typeof value.video_id !== 'string') {
          throw new Error('Activity details must have a valid "video_id" (string)');
        }

        if (!value.hasOwnProperty('duration') || typeof value.duration !== 'number') {
          throw new Error('Activity details must have a valid "duration" (number)');
        }

        return true; // Validation passed
      } catch (error) {
        throw new Error('Activity details must be a valid JSON object with "video_id" and "duration" properties');
      }
    }),

  // Handle the request
  async (req, res) => {
    const { student_id, activity_type, activity_details } = req.body;
    const teacher_id = req.user.userId; // Teacher ID from the logged-in user

    // Check validation result
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    try {
      // Check if the student exists
      const studentCheckQuery = 'SELECT * FROM Students WHERE id = $1';
      const studentCheckResult = await pool.query(studentCheckQuery, [student_id]);

      if (studentCheckResult.rows.length === 0) {
        return res.status(400).json({
          status: 'error',
          message: 'Student not found',
        });
      }

      // Check if the teacher is assigned to the student
      const relationshipCheckQuery = `
        SELECT 1
        FROM Teacher_Student_Relationship tsr
        WHERE tsr.teacher_id = $1 AND tsr.student_id = $2
      `;
      const relationshipCheckResult = await pool.query(relationshipCheckQuery, [teacher_id, student_id]);

      if (relationshipCheckResult.rows.length === 0) {
        return res.status(403).json({
          status: 'error',
          message: 'You are not authorized to record activities for this student',
        });
      }

      // Insert activity into Activities table
      const insertActivityQuery = 'INSERT INTO ActivityLogs (student_id, activity_type, activity_details) VALUES ($1, $2, $3) RETURNING *';
      const values = [student_id, activity_type, JSON.stringify(activity_details)]; // Store as JSON string
      const activityResult = await pool.query(insertActivityQuery, values);

      res.status(201).json({
        status: 'success',
        message: 'Activity recorded successfully',
        activity: activityResult.rows[0],
      });
    } catch (error) {
      console.error('Error recording activity:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to record activity',
      });
    }
  }
];

// Get activity logs for a specific student
exports.getActivities = async (req, res) => {
  const { id } = req.params;  // Student ID from URL parameter
  const teacher_id = req.user.userId;  // Teacher ID from the logged-in user

  console.log(`Fetching activities for student with ID: ${id}`);
  console.log(`Teacher ID from JWT: ${teacher_id}`);

  try {
    // Step 1: If the user is a teacher, check if they are assigned to the student
    if (req.user.role === 'teacher') {
      const relationshipCheckQuery = `
        SELECT 1
        FROM Teacher_Student_Relationship tsr
        WHERE tsr.teacher_id = $1 AND tsr.student_id = $2
      `;
      const relationshipCheckResult = await pool.query(relationshipCheckQuery, [teacher_id, id]);

      if (relationshipCheckResult.rows.length === 0) {
        console.log(`Teacher with ID ${teacher_id} is not assigned to student ${id}`);
        return res.status(403).json({
          status: 'error',
          message: 'Access denied: You are not authorized to view this student\'s activities',
        });
      }
      console.log(`Teacher with ID ${teacher_id} is assigned to student ${id}`);
    }

    // Step 2: Fetch the activity logs for the student
    const query = 'SELECT * FROM ActivityLogs WHERE student_id = $1 ORDER BY timestamp DESC';
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'No activities found for this student',
      });
    }

    res.json(result.rows);  // Return the activities found
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
};
