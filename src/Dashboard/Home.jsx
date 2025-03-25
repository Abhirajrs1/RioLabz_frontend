import React, { useState } from 'react';
import HomeNav from '../Navigation/HomeNav';
import { Container, Row, Col, Card, Button, Form, Badge } from 'react-bootstrap';
import {
    Star,
    CartPlus,
    Search,
    Filter,
    ChevronDown
} from 'react-bootstrap-icons';

// Sample Food Data
const initialFoodItems = [
    {
        id: 1,
        name: "Classic Margherita Pizza",
        description: "Traditional pizza with fresh tomato sauce, mozzarella, and basil",
        price: 12.99,
        category: "Pizza",
        rating: 4.5,
        image: "/api/placeholder/300/200"
    },
    {
        id: 2,
        name: "Chicken Alfredo Pasta",
        description: "Creamy pasta with grilled chicken and parmesan cheese",
        price: 14.50,
        category: "Pasta",
        rating: 4.7,
        image: "/api/placeholder/300/200"
    },
    {
        id: 3,
        name: "Vegetarian Burger",
        description: "Plant-based burger with fresh vegetables and special sauce",
        price: 10.99,
        category: "Burger",
        rating: 4.3,
        image: "/api/placeholder/300/200"
    },
    {
        id: 4,
        name: "Caesar Salad",
        description: "Fresh romaine lettuce with grilled chicken, croutons, and Caesar dressing",
        price: 8.99,
        category: "Salad",
        rating: 4.6,
        image: "/api/placeholder/300/200"
    }
];
function Home() {

    const[foodItems, setFoodItems] = useState(initialFoodItems);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Get unique categories
    const categories = [
        'All',
        ...new Set(initialFoodItems.map(item => item.category))
    ];

    // Filter and search logic
    const filteredFoodItems = foodItems.filter(item =>
        (selectedCategory === 'All' || item.category === selectedCategory) &&
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Add to cart handler
    const handleAddToCart = (item) => {
        console.log('Added to cart:', item);
        // Implement actual cart logic
    };
    return (
        <>
        <HomeNav/>
        <Container fluid className="p-4 bg-light">
            {/* Header */}
            <Row className="mb-4 align-items-center">
                <Col md={6}>
                    <h1 className="fw-bold">Our Delicious Menu</h1>
                    <p className="text-muted">Discover amazing food experiences</p>
                </Col>
                <Col md={6}>
                    {/* Search and Filter */}
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search foods..."
                            className="me-2"
                            aria-label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button variant="outline-primary">
                            <Search />
                        </Button>
                    </Form>
                </Col>
            </Row>

            {/* Category Filters */}
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

            {/* Food Items Grid */}
            <Row xs={1} md={2} lg={4} className="g-4">
                {filteredFoodItems.map(item => (
                    <Col key={item.id}>
                        <Card className="h-100 shadow-sm">
                            <Card.Img
                                variant="top"
                                src={item.image}
                                className="card-img-top"
                                style={{ objectFit: 'cover', height: '200px' }}
                            />
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <Badge bg="secondary">{item.category}</Badge>
                                    <div className="text-warning">
                                        <Star /> {item.rating}
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

            {/* No Results Handling */}
            {filteredFoodItems.length === 0 && (
                <Row className="justify-content-center mt-4">
                    <Col md={6} className="text-center">
                        <h4 className="text-muted">No items found</h4>
                        <p>Try adjusting your search or filter</p>
                    </Col>
                </Row>
            )}
        </Container>
        </>
    )
}

export default Home