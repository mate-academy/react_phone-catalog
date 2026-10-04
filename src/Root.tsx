import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import {
  ActiveCategoryProvider,
  CartProvider,
  FavoritesProvider,
  ThemeProvider,
} from './modules/shared/context';
import { HomePage } from './modules/HomePage';
import { CategoryPage } from './modules/CategoryPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { CartPage } from './modules/CartPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { NotFoundPage } from './modules/NotFoundPage';

export const Root = () => (
  <Router>
    <ThemeProvider>
      <ActiveCategoryProvider>
        <CartProvider>
          <FavoritesProvider>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<HomePage />} />
                <Route path="home" element={<Navigate to="/" replace />} />
                <Route
                  path="phones"
                  element={<CategoryPage category="phones" />}
                />
                <Route
                  path="tablets"
                  element={<CategoryPage category="tablets" />}
                />
                <Route
                  path="accessories"
                  element={<CategoryPage category="accessories" />}
                />
                <Route
                  path="product/:productId"
                  element={<ProductDetailsPage />}
                />
                <Route path="favorites" element={<FavoritesPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </FavoritesProvider>
        </CartProvider>
      </ActiveCategoryProvider>
    </ThemeProvider>
  </Router>
);
