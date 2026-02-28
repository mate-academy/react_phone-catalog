import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Header } from './modules/shared/components/Header';
import { Footer } from './modules/shared/components/Footer/Footer';
import { useEffect } from 'react';
import { useAppSelector } from './app/hooks';
import './styles/global.scss';

export const App = () => {
  const favorites = useAppSelector(state => state.favorites);
  const addedToCart = useAppSelector(state => state.cart);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    localStorage.setItem('cart', JSON.stringify(addedToCart));
  }, [favorites, addedToCart]);

  return (
    <>
      <ScrollRestoration />
      <div className="app">
        <Header />
        <main className="main">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};
