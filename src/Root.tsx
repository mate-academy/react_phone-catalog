import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';
import { HomePage } from './modules/HomePage/HomePage';
import { PhonesPage } from './modules/PhonesPage/PhonesPage';
import { TabletsPage } from './modules/TabletsPage/TabletsPage';
import { FavouritesPage } from './modules/FavouritesPage/FavouritesPage';
import { CartPage } from './modules/CartPage/CartPage';
import { AccessoriesPage } from './modules/AccesoriesPage/AccessoriesPage';
import { ContactsPage } from './modules/ContactsPage/ContactsPage';
import { RightsPage } from './modules/RightsPage/RightsPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />

        <Route path="phones" element={<PhonesPage />} />
        <Route path="tablets" element={<TabletsPage />} />
        <Route path="accessories" element={<AccessoriesPage />} />

        <Route path="favourites" element={<FavouritesPage />} />
        <Route path="cart" element={<CartPage />} />

        <Route path="contacts" element={<ContactsPage />} />
        <Route path="rights" element={<RightsPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
