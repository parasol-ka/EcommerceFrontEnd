import { Row, Col } from 'react-bootstrap';
import ProductItem from './ProductItem';

/**
  * Products component to display a list of products in a grid layout.
  * It takes an array of product objects as a prop and maps over them to render
  * individual ProductItem components.
 */

const Products = ({ products }) => {
  return (
    <Row className="g-4">
      {products.map(product => (
        <Col key={product._id} sm={6} md={4} lg={3}>
          <ProductItem
            id={product._id}
            name={product.name}
            price={product.price}
            image={product.mainImage}
            stock={product.quantity} 
            colors={product.colors} 
            sizes={product.sizes}
          />
        </Col>
      ))}
    </Row>
  );
};

export default Products;
