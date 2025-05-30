import React from 'react';
import { Modal, Button, Spinner, Row, Col, Image } from 'react-bootstrap';
import { useCart } from '../Cart/CartContext';

const Cart = ({ show, handleClose }) => {
  const { cart, loading, increaseOne, reduceOne, removeItem } = useCart();

  const getTotal = () => {
    return cart.reduce((acc, item) => acc + item.product.priceAfterDiscount * item.quantity, 0).toFixed(2);
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Your Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <Spinner animation="border" />
        ) : cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item) => (
              <Row key={item._id} className="align-items-center mb-3 border-bottom pb-2">
                <Col xs={2}>
                  <Image src={item.product.mainImage} fluid rounded />
                </Col>
                <Col xs={4}>{item.product.name}</Col>
                <Col xs={3} className="d-flex align-items-center">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => reduceOne(item.product._id)}
                    disabled={item.quantity === 1}
                  >–</Button>
                  <span className="mx-2">{item.quantity}</span>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => increaseOne(item.product._id)}
                    disabled={item.quantity === item.product.quantity}
                  >+</Button>
                </Col>
                <Col xs={2}>€{(item.product.priceAfterDiscount * item.quantity).toFixed(2)}</Col>
                <Col xs={1}>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removeItem(item.product._id)}
                  >✕</Button>
                </Col>
              </Row>
            ))}
            <hr />
            <h5 className="text-end">Total: €{getTotal()}</h5>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" disabled={cart.length === 0}>Checkout</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Cart;
