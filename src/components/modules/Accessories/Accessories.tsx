import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { loadProducts } from '../../../features/ProductsSlice/ProductsSlice';

import { Catalog } from '../../shared/Catalog/Catalog';

export const Accessories = () => {
  const dispatch = useAppDispatch();
  const accessoryList = useAppSelector(state => state.products.products).filter(
    product => product.category === 'accessories',
  );

  useEffect(() => {
    dispatch(loadProducts());
  }, []);

  return (
    <>
      <Catalog items={accessoryList} category={'accessories'} />
    </>
  );
};
