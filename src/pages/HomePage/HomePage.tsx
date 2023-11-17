import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProducts } from '../../features/productsSlice';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  // eslint-disable-next-line no-console
  console.log(products);

  return (
    <h1>Home page</h1>
  );
};
