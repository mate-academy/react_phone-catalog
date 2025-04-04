import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { loadProducts } from '../../../features/ProductsSlice/ProductsSlice';

import { Catalog } from '../../shared/Catalog/Catalog';

export const Phones = () => {
  const dispatch = useAppDispatch();
  const phonesList = useAppSelector(state => state.products.products).filter(
    product => product.category === 'phones',
  );

  useEffect(() => {
    dispatch(loadProducts());
  }, []);

  return (
    <>
      <Catalog items={phonesList} />
    </>
  );
};
