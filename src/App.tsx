import { Outlet, useLocation } from 'react-router-dom';
import './App.scss';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchProducts } from './features/productsSlice/products';
import { loadFavouritesItmes } from './features/favoritesSlice/favorites';
import { loadCartItems } from './features/cartSlice/cart';
import { ColorTheme } from './types/ColorTheme';

export const App = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const theme = useAppSelector(s => s.theme);

  useEffect(() => {
    const html = document.documentElement;
    const className = `${theme}-theme`;

    Object.values(ColorTheme).forEach(t => html.classList.remove(t + '-theme'));
    html.classList.add(className);

    return () => html.classList.remove(className);
  }, [theme]);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(loadFavouritesItmes());
    dispatch(loadCartItems());
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
