import React from 'react';
import './App.scss';
import { Header } from './modules/shared/layout/Header';
// eslint-disable-next-line max-len
import { HeaderProvider } from './modules/shared/layout/Header/context/HeaderContext';
import { Outlet } from 'react-router-dom';
import { ProductsProvider } from './context/ProductsContext';
import { Footer } from './modules/shared/layout/Footer';
import { useConditionalScroll } from './hooks/useConditionalScroll';
import { SaveProductsProvider } from './context/SaveProductsContext';

export const App = () => {
  useConditionalScroll();

  return (
    <SaveProductsProvider>
      <div className="App">
        <HeaderProvider>
          <Header />
        </HeaderProvider>

        <main className="App-content">
          <ProductsProvider>
            <Outlet />
          </ProductsProvider>
        </main>

        <Footer />
      </div>
    </SaveProductsProvider>
  );
};
