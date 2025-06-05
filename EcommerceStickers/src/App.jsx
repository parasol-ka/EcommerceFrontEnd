import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Layout/Header';
import Banner from './Components/Layout/Banner'; 
import CategoriesOverview from './Components/Layout/CategoriesOverview';
import ProductListPage from './Components/Product/ProductListPage';
import ProductDetail from './Components/Product/ProductDetail';
import Page404 from './Components/Layout/Page404'; 


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
        {/* ✅ Page 404 pour toutes les autres URLs */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default App;
