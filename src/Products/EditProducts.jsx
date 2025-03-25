import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../Services/interceptor.js';
import HomeNav from '../Navigation/HomeNav.jsx';

function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProductDetails();
        fetchCategories();
    }, []);

    const fetchProductDetails = async () => {
        try {
            const response = await axiosInstance.get(`/products/${id}`);
            const product = response.data;
            setName(product.name);
            setCategory(product.category);
            setPrice(product.price);
        } catch (error) {
            console.error('Error fetching product details:', error);
            setError('Failed to load product details.');
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axiosInstance.get('/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleUpdate = async () => {
        if (!name.trim() || !category || !price) {
            setError('All fields are required.');
            return;
        }
        try {
            setLoading(true);
            setError(null);
            setSuccess(null);

            const productData = { name, category, price };
            await axiosInstance.put(`/edit-product/${id}`, productData);
            
            setSuccess('Product updated successfully!');
            setTimeout(() => navigate('/products'), 1500);
        } catch (err) {
            setError('Failed to update product. Try again.');
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
                        <h2 className="mb-4">Edit Product</h2>
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

                            <Button variant="success" onClick={handleUpdate} disabled={loading}>
                                {loading ? 'Updating...' : 'Update Product'}
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default EditProduct;
