import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form, Table } from "react-bootstrap";
import "./Admin.css";

const AdminDashboard = () => {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "add" or "edit"
  const [editUser, setEditUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTeachers();
    fetchStudents();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/teachers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeachers(res.data.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/students", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(res.data.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleDelete = async (id, role) => {
    if (!window.confirm(`Are you sure you want to delete this ${role}?`)) return;
    
    try {
      await axios.delete(`http://localhost:5000/api/${role.toLowerCase()}s/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (role === "Teacher") fetchTeachers();
      else fetchStudents();
    } catch (error) {
      console.error(`Error deleting ${role.toLowerCase()}:`, error);
    }
  };

  const handleShowModal = (type, user = null) => {
    setModalType(type);
    setEditUser(user);
    setShowModal(true);
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <div className="card-container">
        {/* Teachers */}
        <div className="card">
          <h3>Teachers</h3>
          <Button variant="success" onClick={() => handleShowModal("add")}>
            + Add Teacher
          </Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((t) => (
                <tr key={t.id}>
                  <td>{t.username}</td>
                  <td>{t.email}</td>
                  <td>
                    <Button size="sm" onClick={() => handleShowModal("edit", t)}>Edit</Button>
                    <Button size="sm" variant="danger" onClick={() => handleDelete(t.id, "Teacher")}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Students */}
        <div className="card">
          <h3>Students</h3>
          <Button variant="success" onClick={() => handleShowModal("add")}>
            + Add Student
          </Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <td>{s.username}</td>
                  <td>{s.email}</td>
                  <td>
                    <Button size="sm" onClick={() => handleShowModal("edit", s)}>Edit</Button>
                    <Button size="sm" variant="danger" onClick={() => handleDelete(s.id, "Student")}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <UserModal
          show={showModal}
          onHide={() => setShowModal(false)}
          user={editUser}
          type={modalType}
        />
      )}
    </div>
  );
};

const UserModal = ({ show, onHide, user, type }) => {
  const [username, setUsername] = useState(user ? user.username : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const token = localStorage.getItem("token");

  const handleSubmit = async () => {
    try {
      if (type === "add") {
        await axios.post("http://localhost:5000/api/auth/register", { username, email, role: "Teacher" }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.put(`http://localhost:5000/api/users/${user.id}`, { username, email }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      window.location.reload();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{type === "add" ? "Add User" : "Edit User"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="cardedit">
          <div className="card-body">
            <Form>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control 
                  type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </Form.Group>
              <div className="text-center"> {/* Center the button */}
                <Button variant="primary" onClick={handleSubmit}>
                  {type === "add" ? "Add User" : "Save Changes"}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AdminDashboard;
