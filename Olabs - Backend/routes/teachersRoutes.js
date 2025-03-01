const express = require('express');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware'); // Ensure you import your JWT validation middlewares
const pool = require('../config/db'); // Assuming you are using PostgreSQL

const router = express.Router();

// GET teacher details by ID (Accessible by Admins)
router.get('/:id', verifyToken, isAdmin, async (req, res) => {
  const teacherId = req.params.id;
  
  try {
    const query = 'SELECT id, username, email, role FROM Users WHERE id = $1 AND role = $2';
    const values = [teacherId, 'Teacher'];
    
    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Teacher not found'
      });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to fetch teacher details',
    });
  }
});

router.put('/:id', verifyToken, isAdmin, async (req, res) => {
    const teacherId = req.params.id;
    const { username, email } = req.body;
  
    try {
      const query = 'UPDATE Users SET username = $1, email = $2 WHERE id = $3 AND role = $4 RETURNING *';
      const values = [username, email, teacherId, 'Teacher'];
  
      const result = await pool.query(query, values);
  
      if (result.rows.length === 0) {
        return res.status(404).json({
          message: 'Teacher not found'
        });
      }
  
      res.json({ message: 'Teacher updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Failed to update teacher',
      });
    }
});
  
// DELETE teacher (Admin access)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
    const teacherId = req.params.id;
  
    try {
      const query = 'DELETE FROM Users WHERE id = $1 AND role = $2 RETURNING *';
      const values = [teacherId, 'Teacher'];
  
      const result = await pool.query(query, values);
  
      if (result.rows.length === 0) {
        return res.status(404).json({
          message: 'Teacher not found'
        });
      }
  
      res.json({ message: 'Teacher deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Failed to delete teacher',
      });
    }
});

router.post('/:id/assign-student', verifyToken, isAdmin, async (req, res) => {
  const teacherId = req.params.id;
  const { studentId } = req.body;

  try {
      const query = 'INSERT INTO Teacher_Student_Relationship (teacher_id, student_id) VALUES ($1, $2)';
      await pool.query(query, [teacherId, studentId]);

      res.json({ message: 'Student assigned successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to assign student' });
  }
});


module.exports = router;
