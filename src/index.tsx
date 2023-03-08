import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { ProductsProvider } from './helpers/ProductsContext';

import { App } from './App';
import { ScrollToTop } from './helpers/ScrollToTop';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <Router>
      <ProductsProvider>
        <ScrollToTop />
        <App />
      </ProductsProvider>
    </Router>,
  );
