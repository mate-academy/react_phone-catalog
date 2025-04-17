import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { App } from './App';
import { CartProvider } from './Functional/CartContext/CartContext';

const Root = () => (
  <Router>
    <CartProvider>
      <App />
    </CartProvider>
  </Router>
);

createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
