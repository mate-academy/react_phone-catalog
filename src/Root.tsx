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
import { TabletsPage } from './modules/TabletsPage/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage/AccessoriesPage';
import { PhonesPage } from './modules/PhonesPage/PhonesPage';
import { FavoriteProductsPage } from './modules/FavoriteProductsPage/FavoriteProductsPage';
import { CartPage } from './modules/CartPage/CartPage';
import { AppProvider } from './contexts/AppContext';

export const Root = () => (
  <AppProvider>
    <Router>
      <Routes>
        <Route element={<App />}>
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/phones" element={<PhonesPage />} />
          <Route path="/tablets" element={<TabletsPage />} />
          <Route path="/accessories" element={<AccessoriesPage />} />
          <Route path="/favorites" element={<FavoriteProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  </AppProvider>
);
