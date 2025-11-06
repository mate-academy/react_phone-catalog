import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter } from 'react-router-dom';
import { ProductProvider } from './store/ProductContext';
import { ErrorProvider } from './store/ErrorContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <ErrorProvider>
      <ProductProvider>
        <App />
      </ProductProvider>
    </ErrorProvider>
  </HashRouter>,
);
