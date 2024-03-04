import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { CartProvider } from './components/CartContext/CartContext';
import { NotificationWindow } from './components/NotificationWindow';

import './App.scss';

export const App = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  if (pathname === '/home') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="App">
      <CartProvider>
        <Header />
        <Outlet />
        <NotificationWindow />
        <Footer />
      </CartProvider>
    </div>
  );
};
