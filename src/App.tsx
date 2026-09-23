import { Routes, Route } from 'react-router-dom';
import './App.scss';
import { AppLayout } from './components/AppLayout';
import { HomePage } from './modules/HomePage';
import { ProductsPage } from './modules/ProductsPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { CartPage } from './modules/CartPage';
import { ShopProvider } from './context/ShopContext';

export const App = () => (
  <ShopProvider>
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="phones"
          element={<ProductsPage category="phones" title="Phones page" />}
        />
        <Route
          path="tablets"
          element={<ProductsPage category="tablets" title="Tablets page" />}
        />
        <Route
          path="accessories"
          element={
            <ProductsPage category="accessories" title="Accessories page" />
          }
        />
        <Route path="product/:productId" element={<ProductDetailsPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </ShopProvider>
);
