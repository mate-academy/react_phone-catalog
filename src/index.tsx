/* src/index.tsx */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { CartProvider } from './context/CartContext';
import { FavProvider } from './context/FavContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <FavProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </FavProvider>
  </React.StrictMode>,
);
