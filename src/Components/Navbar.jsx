import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import '../styles/Navbar.css';
import 'font-awesome/css/font-awesome.min.css';
import { BASE_URL } from '../config';

const AppNavbar = () => {
  // State to control the visibility of the profile dropdown
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  
  // Function to toggle the profile dropdown
  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleDisconnect = async () => {
    try {
        await fetch(`${BASE_URL}/agent-disconnect`, { method: 'POST' });
        console.log("Disconnect signal sent");
    } catch (error) {
        console.error("Error sending disconnect signal:", error);
    }
};

  const handleHomeClick = () => {
    navigate('/dashboard');
};
  
  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem('token');

    // Redirect to the sign-in page
    navigate('/');
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">
          <img
            src= "https://netinstall.nl/wp-content/uploads/2022/10/Logo-netinstall-2022.png" // Use the imported logo
            width="165"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>
        <Nav className="ml-auto">
        <Nav.Link className="nav-link">
        <Link to="/dashboard" className="" style={{ textDecoration: 'none' }}>
                    <i className="fa fa-home"></i> Home
        </Link>
       </Nav.Link>
           <Nav.Link className="nav-link" onClick={toggleProfileDropdown}>
           <i className="fa fa-user"></i> Profile
                  </Nav.Link>
                          {showProfileDropdown && (
             <NavDropdown title="User" id="basic-nav-dropdown">
          <NavDropdown.Item href="#">
        <i className="fas fa-user"></i> My Profile
          </NavDropdown.Item>
           <NavDropdown.Item href="#">
           <i className="fas fa-wrench"></i> Settings
          </NavDropdown.Item>
    <NavDropdown.Divider />
      <NavDropdown.Item onClick={handleLogout}>
      <i className="fa fa-sign-out-alt"></i> Logout
    </NavDropdown.Item>
  </NavDropdown>
  )}
  <Nav.Link className="nav-link" onClick={handleDisconnect}>
    <i className="fa fa-sign-out"></i> Disconnect
</Nav.Link>
  </Nav>
    </Container>
    </Navbar>
  );
};

export default AppNavbar;
