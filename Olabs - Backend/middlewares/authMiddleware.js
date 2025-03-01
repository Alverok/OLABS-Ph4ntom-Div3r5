const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Token verification failed:", err.message);
      return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }

    req.user = decoded;
    next();
  });
};

// Middleware to check if user is admin (RBAC)
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }
  next();
};

// Middleware to check if user is teacher (RBAC)
exports.isTeacher = (req, res, next) => {
  if (req.user.role !== 'Teacher') {
    return res.status(403).json({ message: 'Access denied: Teachers only' });
  }
  next();
};

// Middleware to check if user is a teacher or admin (RBAC)
exports.isTeacherOrAdmin = (req, res, next) => {
  if (req.user.role !== 'Teacher' && req.user.role !== 'Admin') {
    return res.status(403).json({ message: 'Access denied: Teachers and Admins only' });
  }
  next();
};
