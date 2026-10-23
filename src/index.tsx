import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter as Router } from 'react-router-dom';

import { FavoritesProvider } from './contexts/FavoritesContext';
import { CartProvider } from './contexts/CartContext';
// import { ThemeProvider } from './contexts/ThemeContext';

import './styles/globals.scss';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    {/* <ThemeProvider> */}
    <CartProvider>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </CartProvider>
    {/* </ThemeProvider> */}
  </Router>,
);
