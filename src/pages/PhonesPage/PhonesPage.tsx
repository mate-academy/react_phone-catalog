import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProducts } from '../../features/productsSlice';
import { ProductList } from '../../components/ProductList';
import { Loader } from '../../components/Loader';
import { ProductType } from '../../types/ProductType';
import { Status } from '../../types/Status';

import './PhonesPage.scss';

export const PhonesPage = () => {
  const dispatch = useAppDispatch();
  const { products, status } = useAppSelector(state => state.products);

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

      {status === Status.LOADING && <Loader />}
      {status === Status.IDLE && <ProductList products={getPhones} />}
    </>
  );
};
