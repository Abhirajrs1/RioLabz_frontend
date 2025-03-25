import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import axiosInstance from '../Services/interceptor.js';
import HomeNav from '../Navigation/HomeNav.jsx';
import { useNavigate, useParams } from 'react-router-dom';

function EditCategory() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [categoryName, setCategoryName] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axiosInstance.get(`/categories/${id}`);
                setCategoryName(response.data.name);
            } catch (err) {
                setError('Failed to load category details.');
            }
        };
        fetchCategory();
    }, [id]);

    const handleUpdate = async () => {
        if (!categoryName.trim()) {
            setError('Category name is required.');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            setSuccess(null);
            await axiosInstance.put(`/categories/${id}`, { name: categoryName });
            setSuccess('Category updated successfully!');
            navigate('/categories'); 
        } catch (err) {
            setError('Failed to update category. Try again.');
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
                        <h2 className="mb-4">Edit Category</h2>
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
                            <Button variant="primary" onClick={handleUpdate} disabled={loading}>
                                {loading ? 'Updating...' : 'Update Category'}
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default EditCategory;
