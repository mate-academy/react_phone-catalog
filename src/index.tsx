/* eslint-disable react-hooks/rules-of-hooks */
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ProductProvider } from './context/ProductContext';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { HomePage } from './modules/HomePage';
import { NotFound } from './modules/shared/NotFoundPage';
import { ProductPage } from './modules/ProductPage/ProductPage';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { FavoritePage } from './modules/FavoritesPage';
import { CartPage } from './modules/CartPage';

createRoot(document.getElementById('root') as HTMLElement).render(
  <ProductProvider>
    <CartProvider>
      <FavoritesProvider>
        <Router>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
              <Route path="home" element={<Navigate to="/" replace />} />

              <Route
                path="phones"
                element={<ProductPage category="Phones" />}
              />
              <Route
                path="tablets"
                element={<ProductPage category="Tablets" />}
              />
              <Route
                path="accessories"
                element={<ProductPage category="Accessories" />}
              />

              <Route path="favorites" element={<FavoritePage />} />
              <Route path="cart" element={<CartPage />} />

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </FavoritesProvider>
    </CartProvider>
  </ProductProvider>,
);
