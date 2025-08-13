import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import HomePage from './modules/HomePage';
import NotFoundPage from './modules/NotFoundPage';
import ProductsPage from './modules/ProductsPage';
import ProductDetailsPage from './modules/ProductDetailsPage';
import FavoritesPage from './modules/FavoritesPage';
import CartPage from './modules/CartPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="phones" element={<ProductsPage />} />
        <Route path="tablets" element={<ProductsPage />} />
        <Route path="accessories" element={<ProductsPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="product">
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
