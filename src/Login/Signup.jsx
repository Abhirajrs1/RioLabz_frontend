import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';

function Signup() {
    const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState('');
    
      const handleSignin = (e) => {
        e.preventDefault();
        // Basic validation
        if (!email || !password) {
          setError('Please fill in all fields');
          return;
        }
    
        // Signin logic would go here
        console.log('Signin attempt:', { email, password });
        // Reset error
        setError('');
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
                  placeholder="Enter email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Sign In
              </Button>

              <div className="text-center mt-3">
                <a href="/signup" className="text-decoration-none">
                  Don't have an account? Sign Up
                </a>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
  )
}

export default Signup