// import { useState } from 'react';
import React from 'react';
import './App.scss';
import { Header } from '@/modules/Header';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from './app/providers/Theme';
import { PhonesProvider } from './app/providers/Phones/PhoneContext';
import { CartProvider } from './app/providers/Cart';
import { FavouritesProvider } from './app/providers/Favorities';

export const App: React.FC = () => {
  // const [count, setCount] = useState(0);

  return (
    <>
      <ThemeProvider>
        <CartProvider>
          <FavouritesProvider>
            <PhonesProvider>
              <Header></Header>
              <Outlet />
            </PhonesProvider>
          </FavouritesProvider>
        </CartProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
