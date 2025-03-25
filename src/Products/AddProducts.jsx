import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import axiosInstance from '../Services/interceptor.js';
import { useNavigate } from 'react-router-dom';
import HomeNav from '../Navigation/HomeNav.jsx';

function AddProducts() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axiosInstance.get('/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleSave = async () => {
        if (!name.trim() || !category || !price) {
            setError('All fields are required.');
            return;
        }
        try {
            setLoading(true);
            setError(null);
            setSuccess(null);

            const productData = {
                name,
                category,
                price
            };
            console.log(productData,"DAYA");
            await axiosInstance.post('/add-Product', productData);
            setSuccess('Product added successfully!');
            setTimeout(() => navigate('/products'), 1500);
        } catch (err) {
            setError('Failed to add product. Try again.');
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
                        <h2 className="mb-4">Add Product</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {success && <Alert variant="success">{success}</Alert>}

                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter product name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <option value="">Select a category</option>
                                    {categories.map((cat) => (
                                        <option key={cat._id} value={cat.name}>{cat.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="primary" onClick={handleSave} disabled={loading}>
                                {loading ? 'Adding...' : 'Add Product'}
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default AddProducts;
