import { HashRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage';
import { ProductsPage } from './modules/ProductsPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { ShoppingCartPage } from './modules/ShoppingCartPage';
import { CartProvider, FavoritesProvider } from './modules/shared/contexts';
import { FavoritesPage } from './modules/FavoritesPage';

export const Root = () => (
  <HashRouter>
    <FavoritesProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="phones" element={<ProductsPage />} />
            <Route path="tablets" element={<ProductsPage />} />
            <Route path="accessories" element={<ProductsPage />} />
            <Route path="phones/:productId" element={<ProductDetailsPage />} />
            <Route path="tablets/:productId" element={<ProductDetailsPage />} />
            <Route
              path="accessories/:productId"
              element={<ProductDetailsPage />}
            />
            <Route path="cart" element={<ShoppingCartPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
          </Route>
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
      </CartProvider>
    </FavoritesProvider>
  </HashRouter>
);
