/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './app/store';
import { FiltersProvider } from './contexts/FiltersContext/FiltersContext';
import { MenuProvider } from './contexts/MenuContext/MenuContext';
import { ProductsProvider } from './contexts/ProductsContext/ProductsContext';
import { Footer } from './shared/components/layout/Footer/Footer';
import { Header } from './shared/components/layout/Header';
import { Main } from './shared/components/layout/Main';

export const App: React.FC = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <MenuProvider>
        <ProductsProvider>
          <FiltersProvider>
            <div className="App">
              <Header />

              <Main />

              <Footer />
            </div>
          </FiltersProvider>
        </ProductsProvider>
      </MenuProvider>
    </PersistGate>
  </Provider>
);
