import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FavoriteProvider } from './context/FavoriteContext';

createRoot(
  document.getElementById('root') as HTMLElement,
).render(
  <CartProvider>
    <FavoriteProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </FavoriteProvider>
  </CartProvider>,
);
