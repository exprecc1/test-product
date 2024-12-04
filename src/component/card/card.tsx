import React from 'react';
import { useDispatch } from '../../services/store';
import { toggleLike, removeProduct } from '../../services/product/slice';
import { Product } from '../../utils/types';
import style from './card.module.scss';
import { Link } from 'react-router';

interface CardProps {
  product: Product;
}

const Card: React.FC<CardProps> = ({ product }) => {
  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(toggleLike(product.id));
  };

  const handleRemove = () => {
    dispatch(removeProduct(product.id));
  };

  return (
    <Link to={`/products/${product.id}`} className={style.card_link}>
      <div className={style.card_box}>
        <img src={product.image} alt={product.title} />
        <div className={style.card_content}>
          <div>{product.title}</div>
          <div className={style.buttons}>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleLike();
              }}
            >
              {product.liked ? '❤️' : '🤍'}
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleRemove();
              }}
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
