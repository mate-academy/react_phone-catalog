import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import './fonts/fonts.scss';
import { App } from './App';
import { ProductsProvider } from './context/ProductsProvider';

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <ProductsProvider>
      <App />
    </ProductsProvider>
  </HashRouter>,
);
