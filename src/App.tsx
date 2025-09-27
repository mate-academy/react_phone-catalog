import { Outlet } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { FavoritesProvider } from './context/Favoutires';
import { CartProvider } from './context/Cart';

export const App = () => {
  return (
    <CartProvider>
      <FavoritesProvider>
        <Header />
        <main className="main">
          <Outlet />
        </main>
        <Footer />
      </FavoritesProvider>
    </CartProvider>
  );
};
