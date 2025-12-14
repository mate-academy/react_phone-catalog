import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import 'normalize.css';

import { App } from './App';
import { ProductContextProvider } from './modules/shared/Utills/ProductContext';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <ProductContextProvider>
    <Router>
      <App />
    </Router>
  </ProductContextProvider>,
);
