import React from 'react';
import './App.scss';
import { Header } from './modules/shared/layout/Header';
// eslint-disable-next-line max-len
import { HeaderProvider } from './modules/shared/layout/Header/context/HeaderContext';
import { Outlet } from 'react-router-dom';
import { Footer } from './modules/shared/layout/Footer';
import { useConditionalScroll } from './hooks/useConditionalScroll';
import { SaveProductsProvider } from './context/SaveProductsContext';
import { Provider } from 'react-redux';
import { store } from './app/store';

export const App = () => {
  useConditionalScroll();

  return (
    <SaveProductsProvider>
      <Provider store={store}>
        <div className="App">
          <HeaderProvider>
            <Header />
          </HeaderProvider>

          <main className="App-content">
            {/* <ProductsProvider>
            </ProductsProvider> */}
            <Outlet />
          </main>

          <Footer />
        </div>
      </Provider>
    </SaveProductsProvider>
  );
};
