/* eslint-disable react-hooks/rules-of-hooks */
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ProductProvider } from './context/ProductContext';
import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { HomePage } from './modules/HomePage';
import { NotFoundPage } from './modules/shared/NotFoundPage';
import { ProductPage } from './modules/ProductPage/ProductPage';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { FavoritePage } from './modules/FavoritesPage';
import { CartPage } from './modules/CartPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
// import { ProductDetailsPage } from './modules/ProductDetailsPage';

createRoot(document.getElementById('root') as HTMLElement).render(
  <ProductProvider>
    <CartProvider>
      <FavoritesProvider>
        <Router>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
              <Route path="home" element={<Navigate to="/" replace />} />

              <Route path="phones">
                <Route index element={<ProductPage category="Phones" />} />
                <Route
                  path=":itemId"
                  element={<ProductDetailsPage category="Phones" />}
                />
              </Route>

              <Route path="tablets">
                <Route index element={<ProductPage category="Tablets" />} />
                <Route
                  path=":itemId"
                  element={<ProductDetailsPage category="Tablets" />}
                />
              </Route>

              <Route path="accessories">
                <Route index element={<ProductPage category="Accessories" />} />
                <Route
                  path=":itemId"
                  element={<ProductDetailsPage category="Accessories" />}
                />
              </Route>

              <Route path="favorites" element={<FavoritePage />} />
              <Route path="cart" element={<CartPage />} />

              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Router>
      </FavoritesProvider>
    </CartProvider>
  </ProductProvider>,
);
