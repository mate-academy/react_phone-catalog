import { createRoot } from 'react-dom/client';
import React from 'react';
import { ThemeProvider } from './components/ThemeProvider/ThemeProvider';
import { RoutesManager } from './components/RoutesManager';
import { LikedProvider } from './components/LikedProvider/LikedProvider';
import { CartProvider } from './components/CartProvider/CartProvider';

createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider>
    <LikedProvider>
      <CartProvider>
        <RoutesManager />
      </CartProvider>
    </LikedProvider>
  </ThemeProvider>,
);
