# OLabs Enhancement Project

## Overview

This project aims to enhance the OLabs platform by introducing features such as student-teacher monitoring, assessment tracking, hierarchical user roles, and secure communication. The goal is to provide a personalized learning experience while ensuring data protection and security.

## Technologies Used

- **Frontend:** React
- **Backend:** Node.js with Express.js
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Tokens) for secure user authentication

## GitHub Repository

[OLABS-Ph4ntom-Div3r5](https://github.com/Alverok/OLABS-Ph4ntom-Div3r5)

## Setup Instructions

### Prerequisites

- Node.js (Latest version)
- PostgreSQL (Installed locally or using a cloud service)
- npm (Node Package Manager)

### Step-by-Step Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Alverok/OLABS-Ph4ntom-Div3r5.git
   ```

2. **Navigate to the Backend Directory:**
   ```bash
   cd OLABS-Ph4ntom-Div3r5/backend
   ```

3. **Install Backend Dependencies:**
   ```bash
   npm install
   ```

4. **Create and Configure PostgreSQL Database:**
   - Create a new PostgreSQL database.
   - Update `database.js` with your database credentials.

5. **Run Backend Server:**
   ```bash
   npm start
   ```

6. **Navigate to the Frontend Directory:**
   ```bash
   cd OLABS-Ph4ntom-Div3r5/frontend
   ```

7. **Install Frontend Dependencies:**
   ```bash
   npm install
   ```

8. **Run Frontend Server:**
   ```bash
   npm start
   ```

## Features

- **User Roles:** Hierarchical roles for Admin, Teacher, and Student.
- **Student-Teacher Monitoring:** Teachers can track student progress and activity.
- **Assessment Tracking:** Real-time insights into student performance.
- **Secure Communication:** Encrypted messaging between teachers and students.
- **Data Protection:** Robust security measures to protect user data.

## API Endpoints

### Backend API

- **POST /api/register:** Register a new user.
- **POST /api/login:** Login existing user.
- **GET /api/teachers:** Retrieve list of teachers (Admin only).
- **GET /api/students:** Retrieve list of students (Teacher or Admin).
- **GET /api/students/:id/activities:** Retrieve activity logs for a specific student.
- **POST /api/activities:** Record student activity.

## Contribution Guidelines

- Fork the repository.
- Create a new branch for your feature.
- Commit changes with meaningful messages.
- Open a pull request.

## Known Issues

- Currently, MFA and DDoS protection are not implemented due to project scope limitations.

## Future Development

- Implement AI-driven insights for personalized learning recommendations.
- Integrate adaptive learning paths based on student performance.
- Enhance accessibility features for students with disabilities.
