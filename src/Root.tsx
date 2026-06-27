import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import HomePage from './modules/HomePage';
import NotFoundPage from './modules/NotFoundPage';
import ProductPage from './modules/ProductPage';
import ProductDetailsPage from './modules/ProductDetailsPage';
import FavoritesPage from './modules/FavoritesPage';
import CartPage from './modules/CartPage';

export const Root = () => (
  <Router basename={import.meta.env.BASE_URL}>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="phones" element={<ProductPage />} />
        <Route path="phones/:itemId" element={<ProductDetailsPage />} />
        <Route path="tablets" element={<ProductPage />} />
        <Route path="tablets/:itemId" element={<ProductDetailsPage />} />
        <Route path="accessories" element={<ProductPage />} />
        <Route path="accessories/:itemId" element={<ProductDetailsPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="product">
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
