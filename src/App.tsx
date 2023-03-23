import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

import './styles/App.scss';
import { FavouritesProvider } from './helpers/FavouritesProvider';
import { CartProvider } from './helpers/CartProvider';

export const App: React.FC = () => {
  return (
    <FavouritesProvider>
      <CartProvider>
        <div className="App">
          <Header />

          <Outlet />

          <Footer />
        </div>
      </CartProvider>
    </FavouritesProvider>
  );
};
