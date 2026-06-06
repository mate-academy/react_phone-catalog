import React from 'react';
import { Header } from '@/modules/Header';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '../providers/Theme';
import { CartProvider } from '../providers/Cart';
import { FavouritesProvider } from '../providers/Favorities';
import { Footer } from '../../modules/Footer';
import { ProductsProvider } from '../providers/Products';

export const App: React.FC = () => {
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
