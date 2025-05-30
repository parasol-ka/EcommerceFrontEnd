import { useEffect, useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Spinner, Button } from 'react-bootstrap';
import axios from 'axios';
import logo from '../../assets/StickLogo.webp';
import LoginPopUp from '../Auth/LoginPopUp';
import { useAuth } from '../Auth/AuthContext';
import CartModal from '../Cart/Cart';


const Header = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const { user, logout } = useAuth();
  const [showCart, setShowCart] = useState(false);


  const API_URL = 'http://localhost:3000/api/category';

  useEffect(() => {
    axios.get(API_URL)
      .then((res) => {
        setCategories(res.data.categories);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Erreur lors du chargement des catégories :', err);
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

            <Nav className="ms-auto align-items-center">
              {user ? (
                <>
                  <span className="me-2">👋 Hello, {user.username}</span>
                  <Button size="sm" variant="outline-secondary" onClick={logout}>
                    Logout
                  </Button>
                </>
              ) : (
                <Button size="sm" variant="outline-primary" className='custom-button' onClick={() => setShowAuth(true)}>
                  Sign Up / Log In
                </Button>
              )}
              <Button variant="outline-dark" onClick={() => setShowCart(true)} className="ms-2">
                🛒
              </Button>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <LoginPopUp
  show={showAuth}
  handleClose={() => setShowAuth(false)}
  onLoginSuccess={() => {
    setShowAuth(false);
  }}
/>
<CartModal show={showCart} handleClose={() => setShowCart(false)} />


    </>
  );
};

export default Header;
