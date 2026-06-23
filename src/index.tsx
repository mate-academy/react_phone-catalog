import { createRoot } from 'react-dom/client';
import './styles/globals.scss';
import { App } from './App';
import { HashRouter as Router } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ThemeProvider } from './context/ThemeContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider>
    <CartProvider>
      <FavoritesProvider>
        <Router>
          <App />
        </Router>
      </FavoritesProvider>
    </CartProvider>
  </ThemeProvider>,
);
