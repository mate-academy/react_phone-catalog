import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Components/Header/Header';
import { Footer } from './Components/Footer/Footer';
import { ProductsProvider } from './context/ProductContext';
import { FavoriteProvider } from './context/FavoriteContext';
import { CartProvider } from './context/CartContext';

import './App.scss';

export const App: React.FC = () => {
  return (
    <div className="App">
      <ProductsProvider>
        <FavoriteProvider>
          <CartProvider>
            <Header />

            <Outlet />

            <Footer />
          </CartProvider>
        </FavoriteProvider>
      </ProductsProvider>
    </div>
  );
};
