import { Outlet, useLocation } from 'react-router-dom';
import './App.scss';

import { useEffect } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { CartProvider } from './store/CartStore';
import { FavouriteProvider } from './store/FavouriteContext';
import { ProductsProvider } from './store/ProductContext';

export const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [pathname]);

  return (
    <ProductsProvider>
      <CartProvider>
        <FavouriteProvider>
          <div className="App">
            <h1 className="visually-hidden">Product Catalog</h1>
            <Header />
            <main>
              <Outlet />
            </main>
            <Footer />
          </div>
        </FavouriteProvider>
      </CartProvider>
    </ProductsProvider>
  );
};
