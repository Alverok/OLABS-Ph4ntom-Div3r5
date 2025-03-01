// controllers/userController.js
const pool = require('../config/db');

// Get all teachers (Admin only)
exports.getTeachers = async (req, res) => {
  try {
    const query = `
      SELECT u.id, u.username, u.email, t.name 
      FROM Users u 
      JOIN Teachers t ON u.id = t.user_id
    `;
    const result = await pool.query(query);
    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'error', message: 'No teachers found' });
    }
    res.json({ status: 'success', data: result.rows });
  } catch (error) {
    console.error('Error fetching teachers:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch teachers' });
  }
};

// Get all students (Admin or Teacher)
exports.getStudents = async (req, res) => {
  try {
    let query;
    const queryParams = [];

    if (req.user.role.toLowerCase() === 'admin') {
      query = `
        SELECT u.id, u.username, u.email, s.name 
        FROM Users u 
        JOIN Students s ON u.id = s.user_id
      `;
    } else if (req.user.role.toLowerCase() === 'teacher') {
      query = `
        SELECT u.id, u.username, u.email, s.name
        FROM Users u
        JOIN Students s ON u.id = s.user_id
        JOIN Teacher_Student_Relationship tsr ON tsr.student_id = s.id
        WHERE tsr.teacher_id = $1
      `;
      queryParams.push(req.user.userId);
    } else {
      return res.status(403).json({ status: 'error', message: 'Access forbidden' });
    }

    const result = await pool.query(query, queryParams.length ? queryParams : []);
    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'error', message: 'No students found' });
    }
    res.json({ status: 'success', data: result.rows });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch students' });
  }
};
