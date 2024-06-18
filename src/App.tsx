import { Outlet, useLocation } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { Menu } from './components/Menu';
import { useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { useAppDispatch } from './app/hooks';
import { initiateFavoritesFromLocal } from './features/favoritesSlice';
import { initiateCartFromLocal } from './features/cartSlice';

export const App = () => {
  const [menuShown, setMenuShown] = useState(false);
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setMenuShown(false);
  }, [location]);

  useEffect(() => {
    dispatch(initiateFavoritesFromLocal());
    dispatch(initiateCartFromLocal());
  }, []);

  return (
    <div className="page">
      <Header menuShow={menuShown} setMenuShown={setMenuShown} />
      {menuShown && <Menu />}

      <Outlet />

      <Footer />
    </div>
  );
};
