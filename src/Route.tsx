import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './Pages/HomePage/HomePage';
import { NotFoundPage } from './Pages/NotFoundPage/NotFoundPage';
import { ProductPage } from './Pages/ProductPage/ProductPage';
import { FavoritePage } from './Pages/FavoritePage/FavoritePage';
import { CartPage } from './Pages/CartPage/CartPage';
import { ContactPage } from './Pages/ContactsPage/ContactsPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/favorite" element={<FavoritePage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>
      <Route path="home" element={<Navigate to="/" replace />} />
    </Routes>
  </Router>
);
