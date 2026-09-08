import { createRoot } from 'react-dom/client';
import React from 'react';
import 'bulma/css/bulma.css';
import { Root } from './Root';
import { FavoritesProvider } from './context/FavoritesContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LanguageProvider>
      <ThemeProvider>
        <FavoritesProvider>
          <CartProvider>
            <Root />
          </CartProvider>
        </FavoritesProvider>
      </ThemeProvider>
    </LanguageProvider>
  </React.StrictMode>,
);
