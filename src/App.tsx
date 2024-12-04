import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router';
import ProductsPage from './page/products-page';
import ProductDetailsPage from './page/product-details-page';
import CreateProductPage from './page/create-product-page';
import './style/app.scss';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/create-product" element={<CreateProductPage />} />
        <Route path="*" element={<ProductsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
