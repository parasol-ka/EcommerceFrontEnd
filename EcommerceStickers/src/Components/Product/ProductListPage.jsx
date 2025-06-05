import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { Container, Spinner, Alert } from 'react-bootstrap';
import Products from './ProductGrid'; 

/**
  ProductListPage component fetches and displays a list of products.
  It retrieves the category from search parameters and fetches products accordingly.
  It also fetches the category name for display the title.
  It handles loading states and errors during the fetch operations.
  If a category is selected, it shows products from that category; 
  otherwise, it shows all products.
 */

const ProductListPage = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('category');

  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:3000/api/product?limit=100', {
        params: categoryId ? { category: categoryId } : {},
      });
      setProducts(response.data.products || []);
    } catch (err) {
      console.error(err);
      setError("Unable to load products.");
    }
    setLoading(false);
  };

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
