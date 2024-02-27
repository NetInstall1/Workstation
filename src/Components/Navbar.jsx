import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import '../styles/Navbar.css';
import 'font-awesome/css/font-awesome.min.css';

const AppNavbar = ({ isSignInPage }) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">
          <img
            src="https://netinstall.nl/wp-content/uploads/2022/10/Logo-netinstall-2022.png"
            width="165"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>
        <Nav className="ml-auto">
          {isSignInPage && ( // Show "About Us" only on SignIn page
            <Nav.Link className="nav-link">
              <i className="fa fa-info-circle"></i> About Us
            </Nav.Link>
          )}
          {!isSignInPage && ( // Show other options on pages other than SignIn
            <>
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
                  <NavDropdown.Item onClick={handleLogout}>
                    <i className="fa fa-sign-out-alt"></i> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              <Nav.Link className="nav-link">
                <i className="fa fa-sign-out"></i> Disconnect
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;