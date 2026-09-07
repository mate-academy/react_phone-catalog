import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter } from 'react-router-dom';
import { ProductsProvider } from './modules/shared/context/ProductsContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <ProductsProvider>
      <App />
    </ProductsProvider>
  </HashRouter>,
);
