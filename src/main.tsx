import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './styles/globals.css';

import { Provider } from './provider';
import App from './App';
import { ProductsProvider } from './store/ProductsContext';
import { FavouritesProvider } from './store/FavouritesContext';
import { CartProvider } from './store/CartContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Provider>
        <ProductsProvider>
          <FavouritesProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </FavouritesProvider>
        </ProductsProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
