import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage/HomePage';
import { GlobalProvider } from './shared/store/GlobalProvider';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';
import { FavoritesPage } from './modules/FavoritesPage/FavoritesPage';
import { FavoritesProvider } from './shared/store/FavoritesProvider';
import { CartProvider } from './shared/store/CartProvider';
import { CartPage } from './modules/CartPage/CartPage';
import { ProductPageByCategoryPage } from './modules/ProductPageByCategoryPage/ProductPageByCategoryPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage/ProductDetailsPage';

export const Root = () => {
  return (
    <Router>
      <GlobalProvider>
        <CartProvider>
          <FavoritesProvider>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<HomePage />} />
                <Route path="home" element={<Navigate to="/" replace />} />

                <Route path="phones">
                  <Route index element={<ProductPageByCategoryPage />} />
                  <Route path=":slug?" element={<ProductDetailsPage />} />
                </Route>
                <Route path="tablets">
                  <Route index element={<ProductPageByCategoryPage />} />
                  <Route path=":slug?" element={<ProductDetailsPage />} />
                </Route>
                <Route path="accessories">
                  <Route index element={<ProductPageByCategoryPage />} />
                  <Route path=":slug?" element={<ProductDetailsPage />} />
                </Route>

                <Route path="cart" element={<CartPage />} />
                <Route path="favorites" element={<FavoritesPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </FavoritesProvider>
        </CartProvider>
      </GlobalProvider>
    </Router>
  );
};
