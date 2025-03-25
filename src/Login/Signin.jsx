import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { loginValidationSchema } from '../Services/validation.js';

function Signup() {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      await loginValidationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      setError('')
      setFormData({ email: '', password: '' });
      navigate('/dashboard');

    } catch (validationErrors) {
      const errorMessages = {};
      validationErrors.inner.forEach((error) => {
        errorMessages[error.path] = error.message;
      });
      setErrors(errorMessages);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Header as="h3" className="text-center">Sign In</Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSignin}>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control 
                    type="email" 
                    name="email"
                    placeholder="Enter email" 
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    name="password"
                    placeholder="Password" 
                    value={formData.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Sign In
                </Button>

                <div className="text-center mt-3">
                  <a href="/user-register" className="text-decoration-none">
                    Don't have an account? Sign Up
                  </a>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Signup;
