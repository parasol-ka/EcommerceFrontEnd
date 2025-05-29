import React from 'react';
import { Card } from 'react-bootstrap';
import ProductItemForm from './ProductItemForm';

const ProductItem = ({ id, name, price, image, stock}) => {
  return (
    <Card className="h-100 text-center shadow-sm">
      <Card.Img variant="top" src={image} alt={name} style={{ height: 200, objectFit: 'contain' }} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text className="text-muted">€{price.toFixed(2)}</Card.Text>
        <ProductItemForm productId={id} maxQuantity={stock} />
      </Card.Body>
    </Card>
  );
};

export default ProductItem;
