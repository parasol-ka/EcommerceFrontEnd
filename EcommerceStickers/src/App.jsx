import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Layout/Header';
import Banner from './Components/Layout/Banner'; 
import CategoriesOverview from './Components/Layout/CategoriesOverview';
import ProductListPage from './Components/Product/ProductListPage';
import ProductDetail from './Components/Product/ProductDetail';


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
      </Routes>
    </>
  );
}

export default App;
