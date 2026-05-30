import { createRoot } from 'react-dom/client';
import { App } from './App';
import { CartProvider } from './pages/CartPage/context/CartContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <CartProvider>
    <App />
  </CartProvider>,
);
