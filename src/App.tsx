import { Outlet, useLocation } from 'react-router-dom';
import './App.scss';
import { useEffect } from 'react';
import { useAppDispatch } from './app/hooks';
import { fetchPhones } from './features/phoneSlice/phones';
import { fetchAccessories } from './features/accessoriesSlice/accessories';
import { fetchProducts } from './features/productsSlice/products';
import { fetchTablets } from './features/tabletsSlice/tablets';

export const App = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPhones());
    dispatch(fetchAccessories());
    dispatch(fetchProducts());
    dispatch(fetchTablets());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [pathname]);

  return (
    <div className="App">
      <Outlet />
    </div>
  );
};
