import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Layout/Header';
import Banner from './Components/Layout/Banner'; 
import CategoriesOverview from './Components/Layout/CategoriesOverview';
import ProductListPage from './Components/Product/ProductListPage';

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
      </Routes>
    </>
  );
}

export default App;
