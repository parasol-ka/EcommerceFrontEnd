import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Layout/Header';
import Banner from './Components/Layout/Banner'; 
import CategoriesOverview from './Components/Layout/CategoriesOverview';
import ProductListPage from './Components/Product/ProductListPage';
import ProductDetail from './Components/Product/ProductDetail';
import Page404 from './Components/Layout/Page404'; 

/**
* Renders the global layout including the Header on each page and sets up routing
* for the main pages: home (with Banner and CategoriesOverview), product list,
* product detail, and a 404 page for unmatched routes.
 */

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <Banner />
            <CategoriesOverview />
          </>
        } />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default App;
