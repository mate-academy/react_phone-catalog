import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { CartProvider } from './contexts/CartContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { ThemeProvider } from './contexts/ThemeContext';
import './styles/global.scss';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ThemeProvider>
      <CartProvider>
        <FavoritesProvider>
          <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <App />
          </BrowserRouter>
        </FavoritesProvider>
      </CartProvider>
    </ThemeProvider>
  </StrictMode>,
);
