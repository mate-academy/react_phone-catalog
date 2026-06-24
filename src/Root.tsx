import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import './App.module.scss';
import { HomePage } from './pages/HomePage/Home';
import { ProductList } from './pages/ProductList/ProductList';
import { NotFound } from './pages/NotFound';
import { Favorites } from './pages/Favorites';
import { Cart } from './pages/Cart';
import { ProductDetailsPage } from './ProductDetailsPage/ProductDetailsPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path=":category">
          <Route index element={<ProductList />} />
          <Route path=":slug" element={<ProductDetailsPage />} />
        </Route>
        <Route path="favorites">
          <Route index element={<Favorites />} />
          <Route path=":slug" element={<Favorites />} />
        </Route>
        <Route path="cart">
          <Route index element={<Cart />} />
          <Route path=":slug" element={<Cart />} />
        </Route>
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </Router>
);
