import { Routes, Route } from 'react-router-dom';

import { App } from './App';
import { HomePage } from './pages/HomePage/HomePage';
import { Menu } from './components/Menu';
import { PhonesPage } from './pages/PhonesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { TabletsPage } from './pages/TabletsPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { CartPage } from './pages/CartPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const Root = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />

      <Route path="phones">
        <Route index element={<PhonesPage />} />
        <Route path=":productId" element={<ProductDetailsPage />} />
      </Route>

      <Route path="tablets">
        <Route index element={<TabletsPage />} />
        <Route path=":productId" element={<ProductDetailsPage />} />
      </Route>

      <Route path="accessories">
        <Route index element={<AccessoriesPage />} />
        <Route path=":productId" element={<ProductDetailsPage />} />
      </Route>

      <Route path="favourites" element={<FavouritesPage />} />
      <Route path="cart" element={<CartPage />} />

      <Route path="/menu" element={<Menu />} />

      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);
