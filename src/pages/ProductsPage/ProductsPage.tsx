import React, { memo, useEffect } from 'react';
import BreadCrumbs from '../../components/UI/BreadCrumbs';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import ProductsList from '../../components/common/ProductsList';
import './ProductsPage.scss';
import { productsActions } from '../../store/slices/productsSlice';
import Loader from '../../components/UI/Loader';
import { useAppParams } from '../../enhancers/hooks/appParams';
import ErrorMessage from '../../components/common/ErrorMessage';

export const ProductsPage: React.FC = memo(() => {
  const { category } = useAppParams();
  const dispatch = useAppDispatch();
  const { products, error, loading } = useAppSelector(state => state.products);

  useEffect(() => {
    dispatch(productsActions.init(category));
  }, [category]);

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="products-page">
      <BreadCrumbs />

      <h2>Products Page</h2>

      {loading && <Loader size={100} className="products-page__loader" />}
      {!loading && <ProductsList products={products} />}
    </div>
  );
});
