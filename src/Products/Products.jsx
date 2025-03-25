import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Row, Col, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Services/interceptor.js';
import HomeNav from '../Navigation/HomeNav.jsx';

function Products() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axiosInstance.get('/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    return (
        <>
        <HomeNav/>
        <Container>
            <Row className="mb-3">
                <Col>
                    <h2>Products</h2>
                </Col>
                <Col className="text-end">
                    <Button variant="primary" onClick={() => navigate('/add-product')}>
                        Add Product
                    </Button>
                </Col>
            </Row>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <tr key={product._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <Image 
                                        src={product.imageUrl || 'https://via.placeholder.com/80'} 
                                        alt={product.name} 
                                        width={80} 
                                        height={80} 
                                        rounded
                                    />
                                </td>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>${product.price}</td>
                                <td>
                                    <Button 
                                        variant="warning" 
                                        size="sm" 
                                        onClick={() => navigate(`/edit-product/${product._id}`)}
                                    >
                                        Edit
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No products available</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
        </>
    );
}

export default Products;
