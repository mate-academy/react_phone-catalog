import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { loadProducts } from '../../../features/ProductsSlice/ProductsSlice';

import { Catalog } from '../../shared/Catalog/Catalog';

export const Tablets = () => {
  const dispatch = useAppDispatch();
  const tabletList = useAppSelector(state => state.products.products).filter(
    product => product.category === 'tablets',
  );

  useEffect(() => {
    dispatch(loadProducts());
  }, []);

  return (
    <>
      <Catalog items={tabletList} category={'tablets'} />
    </>
  );
};
