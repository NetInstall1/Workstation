import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import logo from '../images/logo.png';

const AppNavbar = () => {
  // State to control the visibility of the profile dropdown
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Function to toggle the profile dropdown
  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  return (
    <Navbar bg="light" expand="lg" className="border-bottom border-primary">
      <Container>
        <Navbar.Brand href="#">
          <img
            src={logo} // Use the imported logo
            alt="Logo"
            width="70" // Adjust the width as needed
            height="40" // Adjust the height as needed
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="#">Chat</Nav.Link> */}
            {/* <Nav.Link href="#">Support</Nav.Link> */}
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link href="#">Chat</Nav.Link>
            <Nav.Link onClick={toggleProfileDropdown}>Profile</Nav.Link>
            {showProfileDropdown && (
              <NavDropdown title="User" id="basic-nav-dropdown">
                <NavDropdown.Item href="#">My Profile</NavDropdown.Item>
                <NavDropdown.Item href="#">Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#">Logout</NavDropdown.Item>
              </NavDropdown>
            )}
            <Nav.Link href="#">Resources</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
