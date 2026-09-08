import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { loadProducts } from '../../../features/ProductsSlice/ProductsSlice';

import { Catalog } from '../../shared/Catalog/Catalog';
import { Skeleton } from '../../shared/Skeleton/Skeleton';
import { PageNotFound } from '../PageNotFound/PageNotFound';

export const Phones = () => {
  const dispatch = useAppDispatch();
  const { loading, error, products } = useAppSelector(state => state.products);
  const phonesList = products.filter(product => product.category === 'phones');

  useEffect(() => {
    dispatch(loadProducts());
  }, []);

  if (loading) {
    return <Skeleton page="products" />;
  }

  if (error) {
    return <PageNotFound />;
  }

  return (
    <>
      <Catalog items={phonesList} category={'phones'} />
    </>
  );
};
