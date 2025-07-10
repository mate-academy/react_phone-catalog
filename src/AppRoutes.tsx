import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import { FavoritesPage } from './pages/FavoritesPage';
import { CartPage } from './pages/CartPage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/burger_menu" element={<App />} />
          <Route path="/favorites">
            <Route index element={<FavoritesPage />} />
          </Route>
          <Route path="/phones">
            <Route index element={<PhonesPage />} />
          </Route>
          <Route path="/tablets">
            <Route index element={<TabletsPage />} />
          </Route>
          <Route path="/accessories">
            <Route index element={<AccessoriesPage />} />
          </Route>
          <Route path="/cart">
            <Route index element={<CartPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};
