import React, { useState, useEffect } from 'react';
import HomeNav from '../Navigation/HomeNav';
import { Container, Row, Col, Card, Button, Form, Badge } from 'react-bootstrap';
import { Star, CartPlus, Search } from 'react-bootstrap-icons';
import axiosInstance from '../Services/interceptor.js';
import FoodAppFooter from '../Footer/FoodAppFooter.jsx';
function Home() {
    const [foodItems, setFoodItems] = useState([]);
    const [categories, setCategories] = useState(['All']);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axiosInstance.get('/products');
            setFoodItems(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axiosInstance.get('/categories'); 
            const categoryList = response.data.map(cat => cat.name);
            setCategories(['All', ...categoryList]);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const filteredFoodItems = foodItems.filter(item =>
        (selectedCategory === 'All' || item.category === selectedCategory) &&
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddToCart = (item) => {
        console.log('Added to cart:', item);
    };

    return (
        <>
            <HomeNav />
            <Container fluid className="p-4 bg-light">
                <Row className="mb-4 align-items-center">
                    <Col md={6}>
                        <h1 className="fw-bold">Our Delicious Menu</h1>
                        <p className="text-muted">Discover amazing food experiences</p>
                    </Col>
                    <Col md={6}>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search foods..."
                                className="me-2"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Button variant="outline-primary">
                                <Search />
                            </Button>
                        </Form>
                    </Col>
                </Row>

                <Row className="mb-4">
                    <Col>
                        <div className="d-flex gap-2">
                            {categories.map(category => (
                                <Button
                                    key={category}
                                    variant={selectedCategory === category ? 'primary' : 'outline-secondary'}
                                    onClick={() => setSelectedCategory(category)}
                                    size="sm"
                                >
                                    {category}
                                </Button>
                            ))}
                        </div>
                    </Col>
                </Row>

                <Row xs={1} md={2} lg={4} className="g-4">
                    {filteredFoodItems.map(item => (
                        <Col key={item._id}>
                            <Card className="h-100 shadow-sm">
                                <Card.Img
                                    variant="top"
                                    src={item.image || '/default-image.jpg'}
                                    style={{ objectFit: 'cover', height: '200px' }}
                                />
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <Badge bg="secondary">{item.category}</Badge>
                                        <div className="text-warning">
                                            <Star /> {item.rating || 'N/A'}
                                        </div>
                                    </div>
                                    <Card.Title className="fw-bold">{item.name}</Card.Title>
                                    <Card.Text className="text-muted small">
                                        {item.description}
                                    </Card.Text>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h5 className="mb-0 text-primary">${item.price.toFixed(2)}</h5>
                                        <Button
                                            variant="outline-primary"
                                            size="sm"
                                            onClick={() => handleAddToCart(item)}
                                        >
                                            <CartPlus className="me-1" /> Add
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {filteredFoodItems.length === 0 && (
                    <Row className="justify-content-center mt-4">
                        <Col md={6} className="text-center">
                            <h4 className="text-muted">No items found</h4>
                            <p>Try adjusting your search or filter</p>
                        </Col>
                    </Row>
                )}
            </Container>
            <FoodAppFooter/>
        </>
    );
}

export default Home;
