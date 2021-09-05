import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// import './Header.css';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Nav class="navbar navbar-dark bg-dark">
        <Nav.Link as={Link} to="/" className="links">User Management System</Nav.Link>
        {/* <Nav.Link as={Link} to="/" className="links">Users</Nav.Link> */}
      </Nav>
      <Nav>
      <Nav.Link as={Link} to="/users/addUser" className="links">Add a User</Nav.Link>
      {/* <Nav.Link as={Link} to="/" className="links">
        Profile</Nav.Link> */}
    </Nav>
    
    </Navbar>
  );
}

export default Header;
