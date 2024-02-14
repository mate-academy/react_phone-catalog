import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { productsInit } from '../../store/slices/productsSlice';

export const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productsInit());
  });

  return (
    <main className="container">
      <Outlet />
    </main>
  );
};
