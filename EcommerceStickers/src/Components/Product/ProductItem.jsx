import { Card } from 'react-bootstrap';
import ProductItemForm from './ProductItemForm';
import { Link } from 'react-router-dom';

/**
* ProductItem component displays a product card with an image, name, price
* and a form to select quantity, color, and size.
 */

const ProductItem = ({ id, name, price, image, stock, colors, sizes }) => {
  return (
    <Card className="h-100 text-center shadow-sm hover-border">
      <Link to={`/product/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Card.Img variant="top" src={image} alt={name} style={{ height: 200, objectFit: 'contain' }} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text className="text-muted">€{price.toFixed(2)}</Card.Text>
        </Card.Body>
      </Link>
      <ProductItemForm productId={id} maxQuantity={stock} colors={colors} sizes={sizes} />
    </Card>
  );
};

export default ProductItem;
