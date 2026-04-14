import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './App';
import { CartProvider } from './modules/shared/context/CartContext';
import { FavoritesProvider } from './modules/shared/context/FavoritesContext';
import { ThemeProvider } from './modules/shared/context/ThemeContext';

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
