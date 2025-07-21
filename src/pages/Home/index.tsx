import { FC, useEffect } from 'react';
import { useAppDispatch } from '../../hooks';
import { fetchProducts } from '../../features/productsSlice';

export const HomePage: FC = () => {
  const dispatch = useAppDispatch();
  // const { products } = useAppSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Welcome to Nice Gadgets store!</h1>
    </>
  );
};
