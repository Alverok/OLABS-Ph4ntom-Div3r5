// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const { body, validationResult } = require('express-validator');

// Register a new user (student or teacher)
exports.register = [
  // Validate input fields
  body('username').notEmpty().withMessage('Username is required').isAlphanumeric().withMessage('Username must contain only alphanumeric characters'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('role').isIn(['Student', 'Teacher', 'Admin']).withMessage('Role must be either Student, Teacher, or Admin'),

  async (req, res) => {
    const { username, password, email, role } = req.body;

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
      // Check if username already exists
      const userCheckQuery = 'SELECT * FROM Users WHERE username = $1';
      const userCheckResult = await pool.query(userCheckQuery, [username]);

      if (userCheckResult.rows.length > 0) {
        return res.status(400).json({
          status: 'error',
          message: 'Username already exists',
        });
      }

      // Check if email already exists
      const emailCheckQuery = 'SELECT * FROM Users WHERE email = $1';
      const emailCheckResult = await pool.query(emailCheckQuery, [email]);

      if (emailCheckResult.rows.length > 0) {
        return res.status(400).json({
          status: 'error',
          message: 'Email already exists',
        });
      }

      // Hash password before storing
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user into Users table
      const insertUserQuery = 'INSERT INTO Users (username, password_hash, email, role) VALUES ($1, $2, $3, $4) RETURNING id, username, role, email';
      const values = [username, hashedPassword, email, role];
      const userResult = await pool.query(insertUserQuery, values);
      const user = userResult.rows[0];

      // Insert the student or teacher without the institution
      if (role === 'Student') {
        const insertStudentQuery = 'INSERT INTO Students (user_id, name) VALUES ($1, $2) RETURNING *';
        await pool.query(insertStudentQuery, [user.id, username]);
      } else if (role === 'Teacher') {
        const insertTeacherQuery = 'INSERT INTO Teachers (user_id, name) VALUES ($1, $2) RETURNING *';
        await pool.query(insertTeacherQuery, [user.id, username]);
      }

      res.status(201).json({
        status: 'success',
        message: 'User registered successfully',
        user: { id: user.id, username: user.username, role: user.role, email: user.email },
      });

    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to register user',
      });
    }
  }
];

// Login a user and return a JWT token
exports.login = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

  async (req, res) => {
    console.log("Login attempt with email:", req.body.email);
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    try {
      const query = 'SELECT * FROM Users WHERE email = $1';
      const values = [email];
      const result = await pool.query(query, values);
      const user = result.rows[0];

      if (!user) {
        return res.status(400).json({ status: 'error', message: 'User not found' });
      }

      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return res.status(400).json({ status: 'error', message: 'Invalid credentials' });
      }

      // ✅ Ensure role is properly formatted (First letter uppercase, rest lowercase)
      const role = user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase();

      const token = jwt.sign({ userId: user.id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({ status: 'success', message: 'Login successful', token, role });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ status: 'error', message: 'Failed to login' });
    }
  }
];

exports.validateToken = (req, res) => {
  return res.status(200).json({ status: "success", message: "Token is valid" });
};

