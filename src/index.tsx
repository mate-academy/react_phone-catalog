import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';
import { ProductsProvider } from './contexts/ProductsContext';
import { ItemCardProvider } from './contexts/ItemCardContext';
import { CartFavouritesProvider } from './contexts/CartFavouritesContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Router>
      <ProductsProvider>
        <ItemCardProvider>
          <CartFavouritesProvider>
            <AppRoutes />
          </CartFavouritesProvider>
        </ItemCardProvider>
      </ProductsProvider>
    </Router>
  </React.StrictMode>,
);
