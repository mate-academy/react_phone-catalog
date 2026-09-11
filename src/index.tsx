import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter } from 'react-router-dom';
import { CartProvider } from './components/CartContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <CartProvider>
      <App />
    </CartProvider>
  </HashRouter>,
);
