import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { App } from './App';
import { ProductProvider } from './context/ProductContext';
import { StorageProvider } from './context/StorageContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <ProductProvider>
      <StorageProvider>
        <App />
      </StorageProvider>
    </ProductProvider>
  </Router>,
);
