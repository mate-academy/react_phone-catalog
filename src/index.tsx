import { createRoot } from 'react-dom/client';
import { App } from './App';
import 'bulma/css/bulma.css';
import { HashRouter } from 'react-router-dom';
import { ProductActionsProvider } from './context/ProductActionsContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <ProductActionsProvider>
      <App />
    </ProductActionsProvider>
  </HashRouter>,
);
