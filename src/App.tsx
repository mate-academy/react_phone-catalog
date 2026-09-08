/* eslint-disable max-len */
import { Outlet } from 'react-router-dom';
import './App.scss';
import { Footer } from './modules/shared/Footer';
import { StickyHeader } from './modules/shared/StickyHeader';
import { CartProvider } from './modules/CartProvider/CartProvider';
import { FavoritesProvider } from './modules/FavoritesProvider/FavoritesProvider';
import { LanguageProvider } from './contexts/LanguageContext';

export const App = () => (
  <div className="App">
    <LanguageProvider>
      <CartProvider>
        <FavoritesProvider>
          <StickyHeader />
          <main className="content">
            <h1 hidden>Product Catalog</h1>
            <Outlet />
          </main>
          <Footer />
        </FavoritesProvider>
      </CartProvider>
    </LanguageProvider>
  </div>
);
