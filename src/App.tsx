import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ThemeProvider } from './context/ThemeContext';
import { Router } from './router/Router';

export const App = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('pageTitle');
  }, [t]);

  return (
    <ThemeProvider>
      <FavoritesProvider>
        <CartProvider>
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              duration: 400,
              style: {
                background: '#333',
                color: '#fff',
              },
            }}
          />
          <Router />
        </CartProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
};
