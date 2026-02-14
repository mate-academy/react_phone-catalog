import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from './provider.tsx';
import './styles/globals.css';
import App from './App.tsx';
import { ProductsProvider } from './store/ProductsContext.tsx';
import { FavouritesProvider } from './store/FavouritesContext.tsx';
import { CartProvider } from './store/CartContext.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement).render(
  <React.StrictMode>
    <BrowserRouter>
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
