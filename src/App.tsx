import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer';
import { useScrollToTop } from './modules/shared/utils/useScrollToTop';
import { FavItemsProvider } from './modules/shared/context/FavContext';
import { CartProvider } from './modules/shared/context/CartContext';

export const App = () => {
  useScrollToTop();

  return (
    <FavItemsProvider>
      <CartProvider>
        <Header />
        <Outlet />
        <Footer />
      </CartProvider>
    </FavItemsProvider>
  );
};
