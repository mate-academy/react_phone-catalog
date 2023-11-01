import {
  Route, Routes, Navigate,
} from 'react-router-dom';
import App from './App';
import { HomePage } from './pages/HomePage/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import {
  ProductDetailsPage,
} from './pages/ProductDetailsPage/ProductDetailsPage';
import { Favourites } from './pages/FavouritesPage';
import { CartPage } from './pages/CartPage';

export const Root = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="/home" element={<Navigate to="/" />} />
      <Route path="/phones">
        <Route index element={<PhonesPage />} />
        <Route path=":productId" element={<ProductDetailsPage />} />
      </Route>

      <Route path="/tablets">
        <Route index element={<TabletsPage />} />
        <Route path=":productId" element={<ProductDetailsPage />} />
      </Route>

      <Route path="/accessories" element={<AccessoriesPage />}>
        <Route index element={<AccessoriesPage />} />
        <Route path=":productId" element={<ProductDetailsPage />} />
      </Route>
      <Route path="/favourites" element={<Favourites />} />
      <Route path="/cart" element={<CartPage />} />
    </Route>

    <Route path="*" element={<ErrorPage />} />
  </Routes>
);
