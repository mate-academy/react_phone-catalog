import { Outlet } from 'react-router-dom';
import { Navbar } from '@/shared/components/Navbar';
import './Layout.scss';
import { Footer } from '@/shared/components/Footer/Footer';
import { useEffect } from 'react';
import { initializeCart } from '@/store/slices/cartSlice';
import { useAppDispatch } from '@/store/hooks';
import { initializeFavorites } from '@/store/slices/favoritesSlice';

export const Layout = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('shop_cart');
      if (storedCart) {
        dispatch(initializeCart(JSON.parse(storedCart)));
      }
    } catch (error) {
      console.error('Помилка відновлення кошика:', error);
    }
    try {
      const storedFav = localStorage.getItem('shop_favorites');
      if (storedFav) {
        dispatch(initializeFavorites(JSON.parse(storedFav)));
      }
    } catch (error) {
      console.error('Помилка відновлення обраного:', error);
    }
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
