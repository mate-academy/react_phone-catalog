import { Route, HashRouter as Router, Routes } from 'react-router-dom';

import { App } from './App';
import { PhonePage } from './pages/PhonePage';
import { HomePage } from './pages/HomePage';
import { CartPage } from './pages/CartPage';
import { TabletsPage } from './pages/TabletsPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/phones" element={<PhonePage />} />
          <Route path="/tablets" element={<TabletsPage />} />
          <Route path="/accessories" element={<AccessoriesPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/product/:productId" element={<ProductDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
