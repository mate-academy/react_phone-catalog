import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { loadProducts } from '../../../features/ProductsSlice/ProductsSlice';

import { Catalog } from '../../shared/Catalog/Catalog';
import { PageNotFound } from '../PageNotFound/PageNotFound';
import { Skeleton } from '../../shared/Skeleton/Skeleton';

export const Tablets = () => {
  const dispatch = useAppDispatch();
  const { loading, error, products } = useAppSelector(state => state.products);
  const tabletList = products.filter(product => product.category === 'tablets');

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
      <Catalog items={tabletList} category={'tablets'} />
    </>
  );
};
