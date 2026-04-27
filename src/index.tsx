import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom'; // Імпортуємо роутер
import { App } from './App';
import { FavouritesProvider } from './context/FavouriteContext';
import { CartProvider } from './context/CartContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Router>
    {' '}

    <FavouritesProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </FavouritesProvider>
  </Router>,
);
