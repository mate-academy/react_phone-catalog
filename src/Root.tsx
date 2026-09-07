import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { NotFoundPage } from './modules/NotFoundPage';
import { HomePage } from './modules/HomePage';
import { PhonesPage } from './modules/PhonesPage';
import { TabletsPage } from './modules/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { Favorites } from './modules/Favorites';
import { CartPage } from './modules/CartPage';

export const Root = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route path="/home" element={<Navigate to="/" replace={true} />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/phones" element={<PhonesPage />} />
      <Route path="/tablets" element={<TabletsPage />} />
      <Route path="/accessories" element={<AccessoriesPage />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/:category/:productId" element={<ProductDetailsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);
