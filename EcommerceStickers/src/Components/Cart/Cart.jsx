import { useEffect, useState } from 'react';
import { Modal, Button, Spinner, Row, Col, Image } from 'react-bootstrap';
import { useCart } from '../Cart/CartContext';
import axios from 'axios';
import { useFloatingAlert } from '../Shared/FloatingAlertContext';
import { useAuth } from '../Auth/AuthContext';

/**
 * Cart component displays the user's shopping cart,
 * allowing them to view, modify, and checkout items.
 * It fetches product details for each item in the cart to display names, images, and prices.
 * Backend oblige me to use a seller token for checkout, cause users cannot modify product quantities directly.
*/

const Cart = ({ show, handleClose }) => {
  const { cart, loading, increaseOne, reduceOne, removeItem, fetchCart } = useCart();
  const [productDetails, setProductDetails] = useState({});
  const { showAlert } = useFloatingAlert();
  const { token } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      const productMap = {};
      for (const item of cart?.items || []) {
        const id = item.product;
        if (!productMap[id]) {
          try {
            const res = await axios.get(`http://localhost:3000/api/product/${id}`);
            productMap[id] = res.data.product;
          } catch (err) {
            console.error('Error fetching product', id, err);
          }
        }
      }
      setProductDetails(productMap);
    };
    if (Array.isArray(cart?.items) && cart.items.length > 0) fetchProducts();
  }, [cart]);

const getSellerToken = async () => {
  try {
    const res = await axios.post('http://localhost:3000/api/auth/login', {
      email: 'gianni.tricarico@heh.be',
      password: 'kotik',
    });
    return res.data.tokens.accessToken;
  } catch (err) {
    console.error('Erreur lors de la connexion seller :', err);
    return null;
  }
};

const handleCheckout = async () => {
  try {
    const sellerToken = await getSellerToken();
    if (!sellerToken) {
      showAlert('Impossible de récupérer le token du vendeur.', 'danger');
      return;
    }
    for (const item of cart.items) {
      const productId = item.product;
      const quantityOrdered = item.totalProductQuantity;
      const currentProduct = productDetails[productId];
      if (!currentProduct) continue;

      const newQuantity = Math.max(currentProduct.quantity - quantityOrdered, 0);

      await axios.patch(`http://localhost:3000/api/product/${productId}/details`, {
        quantity: newQuantity
      }, {
        headers: { Authorization: `Bearer ${sellerToken}` }
      });
    }

    await axios.delete('http://localhost:3000/api/cart', {
      headers: { Authorization: `Bearer ${token}` }
    });

    showAlert('Your order has been confirmed! 🎉', 'success');
    handleClose();
    fetchCart();

  } catch (err) {
    console.error('Checkout error:', err);
    showAlert('Checkout failed. Please try again.', 'danger');
  }
};
  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Your Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <Spinner animation="border" />
        ) : !cart?.items?.length ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cart.items.map((item) => {
              const product = productDetails[item.product];
              return (
                <Row key={item._id} className="align-items-center mb-3 border-bottom pb-2">
                  <Col xs={2}>
                    <Image src={product?.mainImage} fluid rounded />
                  </Col>
                  <Col xs={4}>
                    {product?.name || 'Unknown Product'}
                    <br />
                    <small>{item.selectedColor?.color} – {item.selectedSize?.size}</small>
                  </Col>
                  <Col xs={3} className="d-flex align-items-center">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => reduceOne(product?._id, item.selectedColor, item.selectedSize)}
                      disabled={item.totalProductQuantity === 1}
                    >–</Button>
                    <span className="mx-2">{item.totalProductQuantity}</span>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => increaseOne(product?._id, item.selectedColor, item.selectedSize)}
                      disabled={product && item.totalProductQuantity >= product.quantity}
                    >+</Button>
                  </Col>
                  <Col xs={2}>€{item.totalProductPrice.toFixed(2)}</Col>
                  <Col xs={1}>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeItem(product?._id, item.selectedColor, item.selectedSize)}
                    >✕</Button>
                  </Col>
                </Row>
              );
            })}
            <hr />
            <h5 className="text-end">Total: €{cart.totalPrice.toFixed(2)}</h5>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="outline-primary" className="custom-button custom-main-button" 
        onClick={handleCheckout}
        disabled={!cart?.items?.length}>Checkout</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default Cart;
