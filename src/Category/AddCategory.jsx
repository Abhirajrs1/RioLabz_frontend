import React, { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import axiosInstance from '../Services/interceptor.js';
import HomeNav from '../Navigation/HomeNav.jsx';
import { useNavigate } from 'react-router-dom';

function AddCategory() {
    const navigate=useNavigate()
    const [categoryName, setCategoryName] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        if (!categoryName.trim()) {
            setError('Category name is required.');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            setSuccess(null);
            await axiosInstance.post('/addCategory', { name: categoryName });
            setSuccess('Category added successfully!');
            setCategoryName('');
            navigate('/categories')
        } catch (err) {
            setError('Failed to add category. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <HomeNav />
            <Container>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <h2 className="mb-4">Add Category</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {success && <Alert variant="success">{success}</Alert>}

                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Category Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter category name"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="primary" onClick={handleSave} disabled={loading}>
                                {loading ? 'Adding...' : 'Add Category'}
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default AddCategory;
