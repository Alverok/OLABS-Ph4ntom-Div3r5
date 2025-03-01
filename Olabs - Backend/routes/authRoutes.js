const express = require('express');
const { register, login, validateToken } = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/validate', verifyToken, validateToken); // ✅ New route

module.exports = router;
