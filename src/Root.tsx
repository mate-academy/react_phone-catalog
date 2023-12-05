import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { CartPage } from './pages/CartPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="/phones" element={<PhonesPage />} />
        <Route path="/tablets" element={<TabletsPage />} />
        <Route path="/accessories" element={<AccessoriesPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:productId" element={<ProductDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
