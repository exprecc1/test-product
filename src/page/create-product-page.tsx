import React from 'react';
import CreateProductForm from '../component/create-product-form/create-product-form';
import { Link } from 'react-router';

const CreateProductPage: React.FC = () => {
  return (
    <div className="container">
      <h1>Создание продукта</h1>
      <Link to="/products" className="back_button">
        Вернуться на главную
      </Link>
      <CreateProductForm />
    </div>
  );
};

export default CreateProductPage;
