import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './modules/shared/components/Header';
import { Footer } from './modules/shared/components/Footer';
import { CartProvider } from './context/CartContext';
import { FavouritesProvider } from './context/FavouritesContext';

export const App = () => (
  <div className="App">
    <CartProvider>
      <FavouritesProvider>
        <Header />
        <main className="main">
          <Outlet />
        </main>
        <Footer />
      </FavouritesProvider>
    </CartProvider>
  </div>
);
