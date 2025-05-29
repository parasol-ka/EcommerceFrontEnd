import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Carousel, Spinner, Alert } from 'react-bootstrap';
import ProductItemForm from './ProductItemForm';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0); // pour le carousel

  useEffect(() => {
    axios.get(`http://localhost:3000/api/product/${id}`)
      .then(res => {
        setProduct(res.data.product);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Unable to fetch product.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center my-5"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger" className="my-5">{error}</Alert>;
  if (!product) return null;

  const allImages = [product.mainImage, ...(product.images || [])];

  return (
    <Container className="my-5">
      <Row className="g-4">
        <Col md={6}>
          {/* Carousel principal */}
          <Carousel
            activeIndex={activeIndex}
            onSelect={(selectedIndex) => setActiveIndex(selectedIndex)}
            variant="dark"
          >
            {allImages.map((img, idx) => (
              <Carousel.Item key={idx}>
                <img
                  className="d-block w-100 rounded"
                  src={img}
                  alt={`Slide ${idx + 1}`}
                  style={{ maxHeight: 400, objectFit: 'contain' }}
                />
              </Carousel.Item>
            ))}
          </Carousel>

          {/* Thumbnails */}
          <Row className="mt-3 g-2 justify-content-center">
            {allImages.map((img, idx) => (
              <Col xs={3} sm={2} key={idx}>
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  onClick={() => setActiveIndex(idx)}
                  style={{
                    cursor: 'pointer',
                    border: idx === activeIndex ? '2px solid hotpink' : '1px solid #ccc',
                    borderRadius: '5px',
                    width: '100%',
                    objectFit: 'cover',
                    height: '70px'
                  }}
                />
              </Col>
            ))}
          </Row>
        </Col>

        <Col md={6}>
          <h2>{product.name}</h2>
          <p className="text-muted">{product.description}</p>
          <h4 className="text-pink">€{product.price}</h4>
          <p><strong>Size:</strong> {product.sizes.map(s => s.size).join(', ')}</p>
          <p><strong>Color:</strong> {product.colors.map(c => c.color).join(', ')}</p>

          {/* Formulaire d’ajout au panier */}
          <div >
            <ProductItemForm productId={product._id} maxQuantity={product.quantity} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
