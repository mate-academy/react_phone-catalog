import './App.scss';
import { Outlet } from 'react-router-dom';
import { Header } from './modules/HomePage/components/Header';
import { Footer } from './modules/HomePage/components/Footer';
import { CartProvider } from './CartContext';
import { FavouritesProvider } from './FavouritesContext';

export const App = () => {
  return (
    <CartProvider>
      <FavouritesProvider>
        <div className="page">
          <h1 className="hidden">Product Catalog</h1>
          <Header />
          <Outlet />
          <Footer />
        </div>
      </FavouritesProvider>
    </CartProvider>
  );
};
