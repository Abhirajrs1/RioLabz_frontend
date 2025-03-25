import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Alert, Spinner } from 'react-bootstrap';
import axiosInstance from '../Services/interceptor.js';
import HomeNav from '../Navigation/HomeNav.jsx';

function ListUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/getAllUsers');
      setUsers(response.data.users);
    } catch (err) {
      setError('Failed to fetch users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (user) => {
    setSelectedUser(user);
    setShowConfirmModal(true);
  };

  const confirmRoleChange = async () => {
    if (!selectedUser) return;

    try {
      setLoading(true);
      const newRole = selectedUser.role === 'user' ? 'admin' : 'user';
      await axiosInstance.put(`/updateUserRole/${selectedUser._id}`, { role: newRole });
      setSuccess(`User role updated successfully to ${newRole.toUpperCase()}`);
      fetchUsers();
    } catch (err) {
      setError('Failed to update user role. Please try again.');
    } finally {
      setLoading(false);
      setShowConfirmModal(false);
    }
  };

  return (
    <>
      <HomeNav />
      <Container className="my-4">
        {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}
        {success && <Alert variant="success" dismissible onClose={() => setSuccess(null)}>{success}</Alert>}

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="mb-0">User Management</h2>
          <Button variant="primary" onClick={fetchUsers} disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : 'Refresh Users'}
          </Button>
        </div>

        {loading ? (
          <div className="text-center my-4">
            <Spinner animation="border" />
          </div>
        ) : (
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-secondary'}`}>
                      {user.role.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <Button
                      variant={user.role === 'user' ? 'warning' : 'info'}
                      size="sm"
                      onClick={() => handleRoleChange(user)}
                    >
                      {user.role === 'user' ? 'Make Admin' : 'Make User'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {users.length === 0 && !loading && (
          <Alert variant="info">No users found. Try refreshing the list.</Alert>
        )}

        <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Role Change</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to change <strong>{selectedUser?.name}</strong>'s role to{' '}
            <strong>{selectedUser?.role === 'user' ? 'Admin' : 'User'}</strong>?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>Cancel</Button>
            <Button variant="danger" onClick={confirmRoleChange}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Confirm'}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default ListUsers;
