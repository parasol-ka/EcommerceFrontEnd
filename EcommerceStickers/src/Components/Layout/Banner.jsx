import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import bannerImage from '../../assets/banner.webp'; // adapte le chemin selon ton projet

const Banner = () => {
  return (
    <Container className="my-4">
      <Card className="flex-md-row border-0 custom-shadow banner-card">
        <Row className="g-0 align-items-center">
          <Col md={4}>
            <Card.Img
              src={bannerImage}
              alt="Stickers Banner"
              className="img-fluid rounded-start"
            />
          </Col>
          <Col md={8}>
            <Card.Body>
              <Card.Title className="fs-3 fw-bold text-pink">Welcome to StickShop</Card.Title>
              <Card.Text className="fs-5 text-muted">
                Discover a world of adorable, geeky and aesthetic stickers 💖
                Perfect for laptops, journals, phones and more. Designed with love, shipped with care.
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Banner;
