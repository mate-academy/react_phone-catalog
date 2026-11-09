import { HashRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage';
import { ProductsPage } from './modules/ProductsPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { CartPage } from './modules/CartPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { FavoritesProvider } from './modules/shared/context/FavoritesContext';
import { CartProvider } from './modules/shared/context/CartContext';

export const Root = () => (
  <FavoritesProvider>
    <CartProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="phones" element={<ProductsPage category="phones" />} />
            <Route
              path="tablets"
              element={<ProductsPage category="tablets" />}
            />
            <Route
              path="accessories"
              element={<ProductsPage category="accessories" />}
            />
            <Route path="product/:productId" element={<ProductDetailsPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </CartProvider>
  </FavoritesProvider>
);
