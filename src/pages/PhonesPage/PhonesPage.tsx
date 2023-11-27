import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProducts } from '../../features/productsSlice';
import { ProductType } from '../../types/ProductType';

import './PhonesPage.scss';

export const PhonesPage = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const getPhones = useMemo(() => {
    return products
      .filter(product => product.type === ProductType.PHONE);
  }, [products]);

  // eslint-disable-next-line no-console
  console.log(getPhones);

  return (
    <h1>Mobile phones</h1>
  );
};
