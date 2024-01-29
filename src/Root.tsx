import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { App } from './App';
import { GlobalProvider } from './GlobalContext';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { CartPage } from './pages/CartPage';
import { FavoritesPage } from './pages/FavoritesPage';

export const Root = () => (
  <Router>
    <GlobalProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />

          <Route path="/phones" element={<PhonesPage />} />

          <Route path="/tablets" element={<TabletsPage />} />
          <Route path="/accessories" element={<AccessoriesPage />} />

          <Route path="/favourites" element={<FavoritesPage />} />
          <Route path="/cart" element={<CartPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>

      </Routes>
    </GlobalProvider>
  </Router>
);
