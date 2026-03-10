import App from './App';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <CartProvider>
    <Router>
      <App />
    </Router>
  </CartProvider>,
);
