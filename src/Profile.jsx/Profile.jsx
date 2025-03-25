import React, { useState, useEffect, useContext } from 'react';
import { Container, Card, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { AuthContext } from '../Context/Context';
import HomeNav from '../Navigation/HomeNav';
import axiosInstance from '../Services/interceptor.js';

function Profile() {
  const { user } = useContext(AuthContext); // Get user details
  const [name, setName] = useState('');
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch the latest user details when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(`/getUser/${user._id}`);
        setName(response.data.name);
      } catch (err) {
        setError('Failed to fetch user details.');
      }
    };
    fetchUser();
  }, [user._id]);

  const handleEditClick = () => setEditing(true);
  
  const handleCancelClick = () => {
    setEditing(false);
  };

  const handleSaveClick = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await axiosInstance.put(`/updateProfile/${user._id}`, { name });
      setSuccess('Profile updated successfully!');
      setEditing(false);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HomeNav />
      <Container className="my-5">
        <Card className="shadow-sm mx-auto p-4" style={{ maxWidth: '450px', borderRadius: '12px' }}>
          <Card.Body className="text-center">
            <div 
              className="mx-auto mb-3 rounded-circle bg-primary text-white d-flex justify-content-center align-items-center shadow"
              style={{ width: '120px', height: '120px', fontSize: '48px' }}
            >
              {name?.charAt(0).toUpperCase()}
            </div>

            {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}
            {success && <Alert variant="success" dismissible onClose={() => setSuccess(null)}>{success}</Alert>}

            {editing ? (
              <Form.Group className="mb-3">
                <Form.Control 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-center fw-bold"
                />
              </Form.Group>
            ) : (
              <h3 className="fw-bold mb-1">{name}</h3>
            )}
            
            <p className="text-muted">{user.email}</p>

            <hr />

            <div className="text-start">
              <Card.Text>
                <strong>User Details</strong>
              </Card.Text>
              <Card.Text>
                <span className="fw-bold">Name:</span> {editing ? name : name}
              </Card.Text>
              <Card.Text>
                <span className="fw-bold">Email:</span> {user.email}
              </Card.Text>
            </div>

            {editing ? (
              <div className="d-flex justify-content-center gap-2 mt-3">
                <Button variant="secondary" onClick={handleCancelClick} disabled={loading}>
                  Cancel
                </Button>
                <Button variant="success" onClick={handleSaveClick} disabled={loading}>
                  {loading ? <Spinner animation="border" size="sm" /> : 'Save Changes'}
                </Button>
              </div>
            ) : (
              <Button variant="primary" className="mt-3" onClick={handleEditClick}>
                Edit Profile
              </Button>
            )}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default Profile;
