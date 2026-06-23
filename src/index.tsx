import './assets/styles/index.scss';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

import { App } from './App';
import { FavouritesProvider } from './context/FavouritesContext';
import { CartProvider } from './context/CartContext';
import { ThemeContexProvider } from './context/ThemeContext';

createRoot(document.getElementById('root')!).render(
  <ThemeContexProvider>
    <CartProvider>
      <FavouritesProvider>
        <Router>
          <App />
        </Router>
      </FavouritesProvider>
    </CartProvider>
  </ThemeContexProvider>,
);
