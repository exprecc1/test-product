import React, { useEffect } from 'react';
import { useDispatch, useSelector } from '../services/store';
import { RootState } from '../services/store';
import { fetchBeefProducts } from '../services/product/slice';
import ProductList from '../component/product-list/product-list';
import { Link } from 'react-router';

const ProductsPage: React.FC = () => {
  const dispatch = useDispatch();
  const productsStatus = useSelector((state: RootState) => state.products.status);
  const productsError = useSelector((state: RootState) => state.products.error);

  useEffect(() => {
    if (productsStatus === 'idle') {
      dispatch(fetchBeefProducts());
    }
  }, [productsStatus, dispatch]);

  if (productsStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (productsStatus === 'failed') {
    return <div>Error: {productsError}</div>;
  }

  return (
    <div className="container">
      <h1>Products</h1>
      <Link to="/create-product" className="create_button">
        Создать свой продукт
      </Link>
      <ProductList />
    </div>
  );
};

export default ProductsPage;
