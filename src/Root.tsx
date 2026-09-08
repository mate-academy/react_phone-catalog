import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { HomePage } from './modules/HomePage/HomePage';
import { App } from './App';
import './styles/base.scss';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';
import { FavoriteProductsPage } from './modules/FavoriteProductsPage/FavoriteProductsPage';
import { CartPage } from './modules/CartPage/CartPage';
import { AppProvider } from './contexts/AppContext';
import { ProductsPage } from './modules/ProductsPage/ProductsPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage/ProductDetailsPage';

export const Root = () => (
  <Router>
    <AppProvider>
      <Routes>
        <Route element={<App />}>
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route index element={<HomePage />} />
          <Route path="phones" element={<ProductsPage type="phones" />} />
          <Route path="phones/:productId" element={<ProductDetailsPage />} />
          <Route path="tablets" element={<ProductsPage type="tablets" />} />
          <Route path="tablets/:productId" element={<ProductDetailsPage />} />
          <Route
            path="accessories"
            element={<ProductsPage type="accessories" />}
          />
          <Route
            path="accessories/:productId"
            element={<ProductDetailsPage />}
          />
          <Route path="favorites" element={<FavoriteProductsPage />} />
          <Route path="favorites/:productId" element={<ProductDetailsPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AppProvider>
  </Router>
);
