import React, { useEffect, useState } from 'react';
import { Modal, Button, Spinner, Row, Col, Image } from 'react-bootstrap';
import { useCart } from '../Cart/CartContext';
import axios from 'axios';

const Cart = ({ show, handleClose }) => {
  const { cart, loading, increaseOne, reduceOne, removeItem } = useCart();
  const [productDetails, setProductDetails] = useState({});

  // Récupération des détails des produits via leurs ID
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
        <Button variant="primary" disabled={!cart?.items?.length}>Checkout</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Cart;
