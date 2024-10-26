import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';

import { FavouritesPage } from './pages/FavouritesPage';
import { CartPage } from './pages/CartPage';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';

export const Root: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/home" element={<Navigate to="/" replace={true} />} />
          <Route index element={<HomePage />} />

          <Route path="/phones">
            <Route index element={<PhonesPage />} />
          </Route>

          <Route path="/tablets">
            <Route index element={<TabletsPage />} />
          </Route>

          <Route path="/accessories">
            <Route index element={<AccessoriesPage />} />
          </Route>

          <Route path="/favourites">
            <Route index element={<FavouritesPage />} />
          </Route>

          <Route path="/cart">
            <Route index element={<CartPage />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
};
