import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  MapPin, 
  Phone, 
  Mail 
} from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const FoodAppFooter = () => {
  return (
    <footer className="bg-dark text-white py-5">
      <Container>
        <Row className="g-4">
          <Col md={4}>
            <h5 className="mb-3">About Tasty Bites</h5>
            <p className="text-muted">
              Delicious food delivered to your doorstep. We're passionate about bringing fresh, 
              quality meals that delight your taste buds and nourish your body.
            </p>
            <div className="social-icons mt-3">
              <a href="#" className="text-white me-3"><Facebook size={24} /></a>
              <a href="#" className="text-white me-3"><Instagram size={24} /></a>
              <a href="#" className="text-white me-3"><Twitter size={24} /></a>
              <a href="#" className="text-white"><Linkedin size={24} /></a>
            </div>
          </Col>

          {/* Quick Links */}
          <Col md={4}>
            <h5 className="mb-3">Quick Links</h5>
            <Row>
              <Col xs={6}>
                <ul className="list-unstyled">
                  <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Home</a></li>
                  <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Menu</a></li>
                  <li className="mb-2"><a href="#" className="text-muted text-decoration-none">About Us</a></li>
                </ul>
              </Col>
              <Col xs={6}>
                <ul className="list-unstyled">
                  <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Services</a></li>
                  <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Contact</a></li>
                  <li className="mb-2"><a href="#" className="text-muted text-decoration-none">FAQ</a></li>
                </ul>
              </Col>
            </Row>
          </Col>

          <Col md={4}>
            <h5 className="mb-3">Contact Us</h5>
            <div className="mb-2">
              <MapPin size={20} className="me-2 text-primary" />
              <span className="text-muted">123 Foodie Street, Culinary City</span>
            </div>
            <div className="mb-2">
              <Phone size={20} className="me-2 text-primary" />
              <span className="text-muted">(555) 123-4567</span>
            </div>
            <div className="mb-3">
              <Mail size={20} className="me-2 text-primary" />
              <span className="text-muted">support@tastybites.com</span>
            </div>

            {/* Newsletter Signup */}
            <Form>
              <Form.Group className="d-flex">
                <Form.Control 
                  type="email" 
                  placeholder="Enter your email" 
                  className="me-2" 
                />
                <Button variant="primary">Subscribe</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>

        {/* Copyright */}
        <hr className="my-4 bg-secondary" />
        <div className="text-center">
          <p className="mb-0 text-muted">
            © {new Date().getFullYear()} Tasty Bites. All Rights Reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default FoodAppFooter;