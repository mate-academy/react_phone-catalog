import { createRoot } from 'react-dom/client';
import { App } from './app';
import { HashRouter as Router } from 'react-router-dom';
import { ProductsProvider } from './shared/context/ProductsContext';
import { ProductsStateProvider } from './shared/context/ProductsStateContext';

const Root = () => (
  <Router>
    <ProductsProvider>
      <ProductsStateProvider>
        <App />
      </ProductsStateProvider>
    </ProductsProvider>
  </Router>
);

createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
