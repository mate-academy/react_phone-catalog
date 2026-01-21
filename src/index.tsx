import { createRoot } from 'react-dom/client';
import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';

import { App } from './App';
import { HomePage } from './modules/HomePage';
import { NotFoundPage } from './modules/NotFoundPage';
import { ProductsPage } from './modules/ProductsPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { CartPage } from './modules/CartPage/CartPage';
// eslint-disable-next-line max-len
import { GlobalStateProvider } from './modules/shared/store/GlobalStateProvider';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <GlobalStateProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path=":type">
            <Route index element={<ProductsPage />} />
          </Route>
          <Route path="product/:productId" element={<ProductDetailsPage />} />
          <Route path="cart" element={<CartPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  </GlobalStateProvider>,
);
