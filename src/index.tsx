import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter } from 'react-router-dom';

import './modules/shared/styles/null.scss';
import './modules/shared/styles/fonts/icons.scss';
import { ProductsProvider } from './modules/shared/context/productsContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <ProductsProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </ProductsProvider>,
);
