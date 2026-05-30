import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './shared/components/Header/Header';
import { Footer } from './shared/components/Footer';
import { FavoritesProvider } from './shared/context/Favorites/FavoritesContext';
import { CartProvider } from './shared/context/Cart/CartContext';
export const App = () => {
  return (
    <FavoritesProvider>
      <CartProvider>
        <Header />

        <main className="main">
          <div className="wrapper">
            <Outlet />
          </div>
        </main>

        <footer className="footer">
          <Footer />
        </footer>
      </CartProvider>
    </FavoritesProvider>
  );
};
