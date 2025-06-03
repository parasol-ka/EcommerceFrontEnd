import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { Container, Spinner, Alert } from 'react-bootstrap';
import Products from './Product'; // le composant qui affiche la grille

const ProductListPage = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('category');

  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Récupère les produits (filtrés si categoryId)
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:3000/api/product?limit=100', {
        params: categoryId ? { category: categoryId } : {},
      });
      console.log(response.data);
      setProducts(response.data.products || []);
    } catch (err) {
      console.error(err);
      setError("Unable to load products.");
    }
    setLoading(false);
  };

  // Récupère le nom de la catégorie si categoryId présent
  const fetchCategoryName = async () => {
    if (!categoryId) {
      setCategoryName('');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/api/category/${categoryId}`);
      setCategoryName(response.data.category.name || '');
    } catch (err) {
      console.error(err);
      setCategoryName('Unknown Category');
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategoryName();
  }, [categoryId]);

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-pink">
        {categoryId ? `${categoryName}` : 'All Products'}
      </h2>

      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && <Products products={products} />}
    </Container>
  );
};

export default ProductListPage;
