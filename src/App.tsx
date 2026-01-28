import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { useAppDispatch, useScrollToTop } from './app/hooks';
import { Menu } from './components/Menu';
import { useEffect } from 'react';
import { loadProducts } from './features/products';
import { loadPhones } from './features/phones';
import { loadTablets } from './features/tablets';
import { loadAccessories } from './features/accessories';

export const App = () => {
  useScrollToTop();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadProducts());
    dispatch(loadPhones());
    dispatch(loadTablets());
    dispatch(loadAccessories());
  }, [dispatch]);

  return (
    <div className="app">
      <Header />
      <Menu />

      <div className="container">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};
