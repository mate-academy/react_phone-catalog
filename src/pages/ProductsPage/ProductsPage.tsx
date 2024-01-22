import React, { memo, useEffect } from 'react';
import BreadCrumbs from '../../UI/BreadCrumbs';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import ProductsList from '../../components/ProductsList';
import './ProductsPage.scss';
import { productsActions } from '../../features/productsSlice';
import Loader from '../../UI/Loader';
import { useAppParams } from '../../hooks/appParams';
import { isInclude } from '../../utils/objectHelper';
import { Category, PAGE } from '../../constants/Router';
import { Navigate } from 'react-router-dom';

export const ProductsPage: React.FC = memo(() => {
  const { category } = useAppParams();

  if (!isInclude(Category, category)) {
    return <Navigate to={PAGE.Home} />;
  }

  const dispatch = useAppDispatch();
  const { products, error, loading } = useAppSelector(state => state.products);

  useEffect(() => {
    dispatch(productsActions.init(category));
  }, [category]);

  const showError = error && !loading;
  const showProductList = !loading && !error;

  return (
    <div className="products-page">
      <BreadCrumbs />

      <h2>Products Page</h2>

      {loading && <Loader size={100} className="products-page__loader" />}
      {showError && <p>{error}</p>}
      {showProductList && <ProductsList products={products} />}
    </div>
  );
});
