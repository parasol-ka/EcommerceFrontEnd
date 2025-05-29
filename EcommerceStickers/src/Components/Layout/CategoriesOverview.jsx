import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Spinner, Alert, Card } from 'react-bootstrap';

const CategoriesOverview = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:3000/api/category';

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        console.log(response.data);
        setCategories(response.data.categories);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading categories:', error);
        setError('Unable to load categories.');
        setIsLoading(false);
      });
  }, []);

  return (
    <Container className="my-5 text-center">
      <h2 className="mb-4 text-pink">OUR CATEGORIES</h2>

      {isLoading && <Spinner animation="border" variant="pink" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {!isLoading && !error && (
        <Row className="g-4 justify-content-center">
          {categories.map((cat) => (
            <Col key={cat._id} xs={10} sm={6} md={4}>
              <Card className="category-card h-100 border-pink">
                <Card.Img
                  variant="top"
                  src={cat.image}
                  alt={cat.name}
                  className="category-img"
                />
                <Card.Body>
                  <Card.Title className="text-pink">{cat.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default CategoriesOverview;
