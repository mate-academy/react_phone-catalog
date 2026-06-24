import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Layout } from './components/Layout';
import { CartPage } from './modules/CartPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { HomePage } from './modules/HomePage';
import { NotFoundPage } from './modules/NotFoundPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { ProductsPage } from './modules/ProductsPage';

export const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="phones" element={<ProductsPage category="phones" />} />
      <Route path="tablets" element={<ProductsPage category="tablets" />} />
      <Route
        path="accessories"
        element={<ProductsPage category="accessories" />}
      />
      <Route path="product/:productId" element={<ProductDetailsPage />} />
      <Route path="favorites" element={<FavoritesPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="home" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);
