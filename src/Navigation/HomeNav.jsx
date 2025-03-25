import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import {
    House,
    PersonCircle,
    Gear,
    BoxArrowRight,
    People,
    PlusCircle,
} from 'react-bootstrap-icons';
import { AuthContext } from '../Context/Context';

function HomeNav() {
    const { user, isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/home');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
            <Container fluid>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    {/* Main Navigation Items */}
                    <Nav className="me-auto">
                        <Nav.Link href="/dashboard">
                            <House className="me-2" /> Dashboard
                        </Nav.Link>
                    </Nav>

                    {/* Adjusted Nav Alignment for Dropdown & Logout */}
                    <Nav className="me-4">  
                        {isAuthenticated ? (
                            <NavDropdown
                                title={
                                    <div className="d-flex align-items-center">
                                        <PersonCircle className="me-2" />
                                        {user.name}
                                    </div>
                                }
                                id="user-nav-dropdown"
                                align="end" // Aligns dropdown properly
                                className="custom-dropdown" // Custom styling
                            >
                                <NavDropdown.Item disabled className="text-center">
                                    <strong>{user.name}</strong>
                                    <br />
                                    <small className="text-muted">{user.email}</small>
                                    <div className="text-muted small mt-1">
                                        Role: {user.role}
                                    </div>
                                </NavDropdown.Item>

                                <NavDropdown.Divider />

                                {/* Conditional Menu Items Based on Role */}
                                {user.role === 'admin' ? (
                                    <>
                                        <NavDropdown.Item href="/add-menu">
                                            <PlusCircle className="me-2" /> Add Menu
                                        </NavDropdown.Item>

                                        <NavDropdown.Item onClick={() => navigate('/users-list')}>
                                            <People className="me-2" /> Users
                                        </NavDropdown.Item>
                                    </>
                                ) : (
                                    <>
                                        <NavDropdown.Item href="/profile">
                                            <PersonCircle className="me-2" /> Profile
                                        </NavDropdown.Item>

                                        <NavDropdown.Item href="/settings">
                                            <Gear className="me-2" /> Settings
                                        </NavDropdown.Item>
                                    </>
                                )}

                                <NavDropdown.Divider />

                                <NavDropdown.Item onClick={handleLogout} className="text-danger text-center">
                                    <BoxArrowRight className="me-2" /> Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <Button variant="outline-light" onClick={() => navigate('/user-login')}>
                                Login
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default HomeNav;
