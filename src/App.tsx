// import { useState } from 'react';
import React from 'react';
import './App.scss';
import { Header } from '@/modules/Header';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from './app/providers/Theme';
import { CartProvider } from './app/providers/Cart';
import { FavouritesProvider } from './app/providers/Favorities';
import { ProductsProvider } from './app/providers/Products/ProductsContext';
import { Footer } from './modules/Footer';

export const App: React.FC = () => {
  // const [count, setCount] = useState(0);

  return (
    <>
      <ThemeProvider>
        <CartProvider>
          <FavouritesProvider>
            <ProductsProvider>
              <Header></Header>
              <Outlet />
              <Footer></Footer>
            </ProductsProvider>
          </FavouritesProvider>
        </CartProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
