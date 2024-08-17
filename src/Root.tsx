/* eslint-disable max-len */
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage/HomePage';
import { PhonesPage } from './modules/PhonesPage/PhonesPage';
import { TabletsPage } from './modules/TabletsPage/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage/AccessoriesPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage/ProductDetailsPage';
import { FavoritesPage } from './modules/FavoritesPage/FavoritesPage';
import { CartPage } from './modules/CartPage/CartPage';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />

        <Route path="/phones" element={<PhonesPage />}>
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>
        <Route path="/tablets" element={<TabletsPage />}>
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>
        <Route path="/accessories" element={<AccessoriesPage />}>
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>

        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);
