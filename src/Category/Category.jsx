import React, { useEffect, useState } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Services/interceptor.js';
import HomeNav from '../Navigation/HomeNav.jsx';

function Category() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axiosInstance.get('/categories');
            console.log(response,"RED");
            
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };
    return (
        <>
            <HomeNav />
            <Container className="mt-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>Categories</h2>
                    <Button variant="success" onClick={() => navigate('/add-category')}>
                        Add Category
                    </Button>
                </div>

                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Category Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length > 0 ? (
                            categories.map((category, index) => (
                                <tr key={category._id}>
                                    <td>{index + 1}</td>
                                    <td>{category.name}</td>
                                    <td>
                                        <Button
                                            variant="warning"
                                            onClick={() => navigate(`/edit-category/${category._id}`)}
                                        >
                                            Edit
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center">
                                    No categories found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default Category