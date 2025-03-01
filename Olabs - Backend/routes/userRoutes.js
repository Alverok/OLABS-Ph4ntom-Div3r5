const express = require('express');
const { getTeachers, getStudents } = require('../controllers/userController');
const { verifyToken, isAdmin, isTeacherOrAdmin } = require('../middlewares/authMiddleware');
const pool = require('../config/db');

const router = express.Router();

// ✅ Get list of teachers (Only Admin can access this route)
router.get('/teachers', verifyToken, isAdmin, getTeachers);

// ✅ Get list of students (Teachers or Admin can access this route)
router.get('/students', verifyToken, isTeacherOrAdmin, getStudents);

// ✅ DELETE Student (Admin Only)
router.delete('/students/:id', verifyToken, isAdmin, async (req, res) => {
    const studentId = req.params.id;

    try {
        // Check if student exists
        const studentCheckQuery = 'SELECT * FROM Students WHERE id = $1';
        const studentCheckResult = await pool.query(studentCheckQuery, [studentId]);

        if (studentCheckResult.rows.length === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Delete from Students table first (to avoid foreign key constraint issues)
        await pool.query('DELETE FROM Students WHERE id = $1', [studentId]);

        // Then delete from Users table
        await pool.query('DELETE FROM Users WHERE id = $1', [studentCheckResult.rows[0].user_id]);

        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ message: 'Failed to delete student' });
    }
});

// ✅ DELETE Teacher (Admin Only)
router.delete('/teachers/:id', verifyToken, isAdmin, async (req, res) => {
    const teacherId = req.params.id;

    try {
        // Check if teacher exists
        const teacherCheckQuery = 'SELECT * FROM Teachers WHERE id = $1';
        const teacherCheckResult = await pool.query(teacherCheckQuery, [teacherId]);

        if (teacherCheckResult.rows.length === 0) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        // Delete from Teachers table first
        await pool.query('DELETE FROM Teachers WHERE id = $1', [teacherId]);

        // Then delete from Users table
        await pool.query('DELETE FROM Users WHERE id = $1', [teacherCheckResult.rows[0].user_id]);

        res.json({ message: 'Teacher deleted successfully' });
    } catch (error) {
        console.error('Error deleting teacher:', error);
        res.status(500).json({ message: 'Failed to delete teacher' });
    }
});

// ✅ UPDATE Student (Admin Only)
router.put('/students/:id', verifyToken, isAdmin, async (req, res) => {
    const studentId = req.params.id;
    const { username, email } = req.body;

    try {
        // Check if student exists
        const studentCheckQuery = 'SELECT * FROM Students WHERE id = $1';
        const studentCheckResult = await pool.query(studentCheckQuery, [studentId]);

        if (studentCheckResult.rows.length === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Update in Users table
        await pool.query('UPDATE Users SET username = $1, email = $2 WHERE id = $3', [username, email, studentCheckResult.rows[0].user_id]);

        res.json({ message: 'Student updated successfully' });
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({ message: 'Failed to update student' });
    }
});

// ✅ UPDATE Teacher (Admin Only)
router.put('/teachers/:id', verifyToken, isAdmin, async (req, res) => {
    const teacherId = req.params.id;
    const { username, email } = req.body;

    try {
        // Check if teacher exists
        const teacherCheckQuery = 'SELECT * FROM Teachers WHERE id = $1';
        const teacherCheckResult = await pool.query(teacherCheckQuery, [teacherId]);

        if (teacherCheckResult.rows.length === 0) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        // Update in Users table
        await pool.query('UPDATE Users SET username = $1, email = $2 WHERE id = $3', [username, email, teacherCheckResult.rows[0].user_id]);

        res.json({ message: 'Teacher updated successfully' });
    } catch (error) {
        console.error('Error updating teacher:', error);
        res.status(500).json({ message: 'Failed to update teacher' });
    }
});

module.exports = router;
