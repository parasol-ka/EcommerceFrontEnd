import { useEffect, useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Spinner, Button } from 'react-bootstrap';
import axios from 'axios';
import logo from '../../assets/StickLogo.webp';
import LoginPopUp from '../PopUps/LoginPopUp'; // ✔️ Ton vrai fichier pop-up

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);

  const API_URL = 'http://localhost:3000/api/category';

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setCategories(response.data.categories);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des catégories :', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar bg="light" variant="light" expand="lg" sticky="top" className="border-pink shadow-sm">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={logo}
              alt="Logo Stick Shop"
              height="60"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav>
              <Nav.Link href="/">HOME</Nav.Link>

              <NavDropdown title="CATEGORIES" id="categories-dropdown" className="custom-dropdown">
                <NavDropdown.Item href="/products">All</NavDropdown.Item>
                {isLoading ? (
                  <NavDropdown.Item disabled>
                    <Spinner animation="border" size="sm" /> Loading...
                  </NavDropdown.Item>
                ) : (
                  categories.map((cat) => (
                    <NavDropdown.Item
                      key={cat._id}
                      href={`/products?category=${encodeURIComponent(cat._id)}`}
                    >
                      {cat.name}
                    </NavDropdown.Item>
                  ))
                )}
              </NavDropdown>
            </Nav>

            <Nav className="ms-auto">
              <Button variant="outline-primary" size="sm" onClick={() => setShowAuth(true)}>
                Sign Up / Log In
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ✅ Ton composant modal affiché si showAuth est true */}
      <LoginPopUp show={showAuth} handleClose={() => setShowAuth(false)} />
    </>
  );
};

export default Header;
