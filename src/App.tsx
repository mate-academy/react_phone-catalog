import { HashRouter, Route, Routes } from 'react-router-dom';
import { CartProvider, FavoritesProvider, ThemeProvider } from './context';
import { CartPage } from './modules/CartPage';
import { CategoryPage } from './modules/CategoryPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { HomePage } from './modules/HomePage';
import { NotFoundPage } from './modules/NotFoundPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { Layout } from './modules/shared';
import './App.scss';

export const App = () => (
  <ThemeProvider>
    <CartProvider>
      <FavoritesProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
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
        </HashRouter>
      </FavoritesProvider>
    </CartProvider>
  </ThemeProvider>
);
