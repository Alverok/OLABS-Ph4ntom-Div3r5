const express = require('express');
const { recordActivity, getActivities } = require('../controllers/activityController');
const { verifyToken, isTeacher, isTeacherOrAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

// Record student activity (Only teachers can access this route)
router.post('/', verifyToken, isTeacher, recordActivity);

// Get activities for a student (Teachers/Admin can access)
router.get('/students/:id/activities', verifyToken, isTeacherOrAdmin, getActivities);

module.exports = router;
