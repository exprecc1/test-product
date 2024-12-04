import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { useParams, Link } from 'react-router';
import style from './product-details.module.scss';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const product = useSelector((state: RootState) => {
    if (id !== undefined) {
      return state.products.products.find((p) => p.id === id);
    }
    return undefined;
  });

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className={style.details_box}>
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} />
      <p>{product.description}Тут должны быть подробности</p>
      <Link to="/products" className={style.back_button}>
        Вернуться назад
      </Link>
    </div>
  );
};

export default ProductDetails;
