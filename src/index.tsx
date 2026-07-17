import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter as Router } from 'react-router-dom';
import './index.scss';
import { FavoritesProvider } from './context';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import './styles/theme.scss';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <ThemeProvider>
      <CartProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </CartProvider>
    </ThemeProvider>
  </Router>,
);
