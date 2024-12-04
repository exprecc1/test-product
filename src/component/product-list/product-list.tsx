import React, { useState } from 'react';
import style from './product-list.module.scss';
import { useSelector } from '../../services/store';
import Card from '../card/card';

const ProductList: React.FC = () => {
  const products = useSelector((state) => state.products.products);
  const [filterLiked, setFilterLiked] = useState(false);

  const filteredProducts = filterLiked ? products.filter((product) => product.liked) : products;

  return (
    <div>
      <div className={style.filter_buttons}>
        <button onClick={() => setFilterLiked(false)}>Показать все</button>
        <button onClick={() => setFilterLiked(true)}>Понравившиеся</button>
      </div>
      <div className={style.product_list}>
        {filteredProducts.map((product: any) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
