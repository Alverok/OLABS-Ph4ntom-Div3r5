// controllers/teacherController.js
const pool = require('../config/db');
const { body, validationResult } = require('express-validator');

// Update teacher's institution after registration
exports.updateInstitution = [
  // Validate institutionId
  body('institutionId').isInt().withMessage('Institution ID must be a valid number'),

  async (req, res) => {
    const { institutionId } = req.body;
    const teacherId = req.user.userId; // Get teacher's ID from JWT (logged-in user)

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
      // Check if the institution exists
      const institutionCheckQuery = 'SELECT * FROM Institutions WHERE id = $1';
      const institutionCheckResult = await pool.query(institutionCheckQuery, [institutionId]);

      if (institutionCheckResult.rows.length === 0) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid institution ID',
        });
      }

      // Update teacher's institution in the Teachers table
      const updateTeacherQuery = 'UPDATE Teachers SET institution_id = $1 WHERE user_id = $2 RETURNING *';
      const updateResult = await pool.query(updateTeacherQuery, [institutionId, teacherId]);

      res.status(200).json({
        status: 'success',
        message: "Teacher's institution updated successfully",
        teacher: updateResult.rows[0],
      });

    } catch (error) {
      console.error('Error updating institution:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to update institution',
      });
    }
  }
];

// Get all students assigned to the teacher
exports.getStudentsForTeacher = async (req, res) => {
  const teacherId = req.user.userId; // Get teacher's ID from JWT (logged-in user)

  try {
    // Fetch students assigned to the teacher
    const query = `
      SELECT u.id, u.username, u.email, s.name 
      FROM Users u
      JOIN Students s ON u.id = s.user_id
      JOIN Teacher_Student_Relationship tsr ON tsr.student_id = s.id
      WHERE tsr.teacher_id = $1
    `;
    const result = await pool.query(query, [teacherId]);

    res.status(200).json({
      status: 'success',
      data: result.rows,
    });

  } catch (error) {
    console.error('Error fetching students for teacher:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch students for teacher',
    });
  }
};
