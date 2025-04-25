import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';

import { App } from './App';
import { HomePage } from './modules/HomePage';
import { ProductPage } from './modules/ProductPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { CartPage } from './modules/CartPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { ScrollToTop } from './shared/components/ScrollToTop';
import { GlobalProvider } from './shared/store/GlobalProvider';
import { FavoritesProvider } from './shared/store/FavoritesProvider';

export const Root = () => {
  return (
    <Router>
      <GlobalProvider>
        <FavoritesProvider>
          <ScrollToTop />

          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
              <Route path="home" element={<Navigate to="/" replace />} />

              <Route path="phones">
                <Route index element={<ProductPage />} />
                <Route path=":slug?" element={<ProductDetailsPage />} />
              </Route>

              <Route path="tablets">
                <Route index element={<ProductPage />} />
                <Route path=":slug?" element={<ProductDetailsPage />} />
              </Route>

              <Route path="accessories">
                <Route index element={<ProductPage />} />
                <Route path=":slug?" element={<ProductDetailsPage />} />
              </Route>

              <Route path="favorites" element={<FavoritesPage />} />

              <Route path="cart" element={<CartPage />} />

              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </FavoritesProvider>
      </GlobalProvider>
    </Router>
  );
};
