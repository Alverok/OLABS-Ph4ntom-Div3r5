const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const activityRoutes = require('./routes/activityRoutes');
const teachersRoutes = require('./routes/teachersRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3001',  // Replace with the frontend URL if different
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type,Authorization', // Allow Authorization header for JWT
}));
app.use(express.json());  // Parse JSON bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/teachers', teachersRoutes);

// Start the server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
