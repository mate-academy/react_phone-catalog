import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';
import { HomePage } from './modules/HomePage';
import { Product } from './modules/ProductPages/Product';
import { ProductDetailsPage } from './modules/ProductPages/ProductDetailsPage';
import { Favorites } from './modules/Favorites';
import { Cart } from './modules/Cart';
export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="phones" element={<Product />} />
          <Route path="tablets" element={<Product />} />
          <Route path="accessories" element={<Product />} />
          <Route path=":category/:slug" element={<ProductDetailsPage />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path={'/cart'} element={<Cart />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
