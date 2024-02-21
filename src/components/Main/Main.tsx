import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { productsInit } from '../../store/slices/productSlice';

export const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productsInit());
  });

  return (
    <main className="main">
      <Outlet />
    </main>
  );
};
