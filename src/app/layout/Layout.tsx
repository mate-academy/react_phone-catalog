import { Outlet } from 'react-router-dom';
import { Navbar } from '@/shared/components/Navbar';
import './Layout.scss';
import { Footer } from '@/shared/components/Footer/Footer';
import { useEffect } from 'react';
import { initializeCart } from '@/store/slices/cartSlice';
import { useAppDispatch } from '@/store/hooks';
import { initializeFavorites } from '@/store/slices/favoritesSlice';
import toast, { Toaster } from 'react-hot-toast';

export const Layout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('shop_cart');

      if (storedCart) {
        dispatch(initializeCart(JSON.parse(storedCart)));
      }
    } catch (error) {
      toast.error('Error restoring cart: ' + error);
    }

    try {
      const storedFav = localStorage.getItem('shop_favorites');

      if (storedFav) {
        dispatch(initializeFavorites(JSON.parse(storedFav)));
      }
    } catch (error) {
      toast.error('Error restoring favorites: ' + error);
    }
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
      <Toaster
        position="bottom-center"
        containerClassName="toaster-container"
        toastOptions={{
          duration: 2500,
          className: 'app-toast',
          success: {
            className: 'app-toast app-toast--success',
          },
          error: {
            className: 'app-toast app-toast--error',
          },
        }}
      />
    </>
  );
};
