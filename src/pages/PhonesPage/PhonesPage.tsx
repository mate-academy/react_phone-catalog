import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProducts } from '../../features/productsSlice';
import { ProductList } from '../../components/ProductList';
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

  return (
    <>
      <h1>Mobile phones</h1>

      <ProductList products={getPhones} />
    </>
  );
};
