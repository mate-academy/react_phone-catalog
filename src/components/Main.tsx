import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from '../utils/hooks/hooks';
import { fetchProducts } from '../store/slices/productsSlice';

import '../styles/blocks/main.scss';

export const Main = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <main className="main">
      <Outlet />
    </main>
  );
};
