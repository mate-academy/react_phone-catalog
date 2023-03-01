import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { ProductsProvider } from './helpers/ProductsContext';

import { App } from './App';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <Router>
      <ProductsProvider>
        <App />
      </ProductsProvider>
    </Router>,
  );
