import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import { FavoritesPage } from 'modules/FavoritesPage/FavoritesPage';
import { ProductsPage } from 'modules/ProductsPage';

import { App } from './App';
import { CartPage } from './modules/CartPage/CartPage';
import { ContactsPage } from './modules/ContactsPage/ContactsPage';
import { HomePage } from './modules/HomePage/HomePage';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';

export const Root: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />

        <Route path=":category" element={<ProductsPage />}>
          <Route path=":id" element={<ProductsPage />} />
        </Route>

        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="cart" element={<CartPage />} />

        <Route path="contacts" element={<ContactsPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
