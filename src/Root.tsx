import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import App from './App';

import { HomePage } from './pages/HomePage/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { PhoneDetailsPage } from './pages/PhoneDetailsPage';
import { CartPage } from './pages/CartPage';
import { FavouritesPage } from './pages/FavouritesPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />

        <Route path="home" element={<Navigate to="/" replace />} />

        <Route path="phones" element={<PhonesPage />} />

        <Route path="tablets" element={<TabletsPage />} />

        <Route path="accessories" element={<AccessoriesPage />} />

        <Route path="phones/:productId" element={<PhoneDetailsPage />} />

        <Route path="cart" element={<CartPage />} />

        <Route path="favourites" element={<FavouritesPage />} />
      </Route>
    </Routes>
  </Router>
);
