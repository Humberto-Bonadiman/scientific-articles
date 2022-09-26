import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

const Header: React.FC = () => {

  return (
    <Navbar expand="sm" bg="primary" variant="dark" className="pt-2 pb-2">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              href="/search"
              data-testid="search__element-navbar-link-search"
            >
              Home Page
            </Nav.Link>
            <Nav.Link
              href="/favorites/1"
              data-testid="favorites__element-navbar-link-favorites"
            >
              Favorites
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
