import './App.scss';
import { HomePage } from './modules/HomePage';
import { PhonesPage } from './modules/PhonesPage';
import { Layout } from './modules/shared/components/Layout';
import { Route, Routes } from 'react-router-dom';
import { TabletsPage } from './modules/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { Cart } from './modules/CartPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { AppProvider } from './context/Context';

export const App = () => {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/phones" element={<PhonesPage />} />
          <Route path="/tablets" element={<TabletsPage />} />
          <Route path="/accessories" element={<AccessoriesPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AppProvider>
  );
};
