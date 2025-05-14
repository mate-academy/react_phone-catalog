import { createRoot } from 'react-dom/client';
import { App } from './App';
import { CartProvider } from './modules/CartContext/CartContext';
import React from 'react';

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>,
);
