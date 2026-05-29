// import { useState } from 'react';
import React from 'react';
import './App.scss';
import { Header } from '@/modules/Header';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from './app/providers/Theme';
import { PhonesProvider } from './app/providers/Phones/PhoneContext';
import { CartProvider } from './app/providers/Cart';
import { FavouritesProvider } from './app/providers/Favorities';
import { ProductsProvider } from './app/providers/Products/ProductsContext';

export const App: React.FC = () => {
  // const [count, setCount] = useState(0);

  return (
    <>
      <ThemeProvider>
        <CartProvider>
          <FavouritesProvider>
            <PhonesProvider>
              <ProductsProvider>
                <Header></Header>
                <Outlet />
              </ProductsProvider>
            </PhonesProvider>
          </FavouritesProvider>
        </CartProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
