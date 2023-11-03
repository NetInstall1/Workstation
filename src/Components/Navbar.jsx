import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import '../styles/Navbar.css';
import 'font-awesome/css/font-awesome.min.css';

const AppNavbar = () => {
  // State to control the visibility of the profile dropdown
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Function to toggle the profile dropdown
  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
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
     <i className="fa fa-comments"></i> Chat
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
    <NavDropdown.Item href="#">
      <i className="fa fa-sign-out-alt"></i> Logout
    </NavDropdown.Item>
  </NavDropdown>
  )}
  <Nav.Link className="nav-link">
  <i className="fa fa-sign-out"></i> Disconnect
</Nav.Link>
  </Nav>
    </Container>
    </Navbar>
  );
};

export default AppNavbar;
