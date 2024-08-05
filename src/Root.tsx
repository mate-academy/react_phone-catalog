/* eslint-disable max-len */
import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/homePage/HomePage';
import { ProductsPage } from './pages/productsPage/ProductsPage';
import { ProductDetailsPage } from './pages/productDetailsPage/ProductDetailsPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { CartPage } from './pages/cartPage';
import { FavoritesPage } from './pages/favoritesPage/FavoritesPage';
import { RightsPage } from './pages/rightsPage';
import { ContactsPage } from './pages/contactsPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="phones" element={<ProductsPage category="Phones" />} />
        <Route path="phones/:productId" element={<ProductDetailsPage />} />
        <Route path="tablets" element={<ProductsPage category="Tablets" />} />
        <Route path="tablets/:productId" element={<ProductDetailsPage />} />
        <Route
          path="accessories"
          element={<ProductsPage category="Accessories" />}
        />
        <Route path="accessories/:productId" element={<ProductDetailsPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="rights" element={<RightsPage />} />
        <Route path="contacts" element={<ContactsPage />} />
      </Route>
    </Routes>
  </Router>
);
