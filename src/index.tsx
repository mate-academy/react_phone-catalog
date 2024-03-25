import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { App } from './App';
import { ProductProvider } from './context/ProductContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <ProductProvider>
    <Router>
      <App />
    </Router>
  </ProductProvider>,
);
