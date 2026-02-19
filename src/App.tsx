import { Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import { HomePage } from './modules/HomePage/components';
import { PhonesPage } from './modules/PhonesPage/components';
import { TabletsPage } from './modules/TabletsPage/components';
import { AccessoriesPage } from './modules/AccessoriesPage/components';
import { ProductPage } from './modules/ProductPage/components';
import { CartPage } from './modules/CartPage/components';
import { FavoritesPage } from './modules/FavoritesPage/components';
import { NotFoundPage } from './modules/NotFoundPage/components';

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/phones" element={<PhonesPage />} />
        <Route path="/tablets" element={<TabletsPage />} />
        <Route path="/accessories" element={<AccessoriesPage />} />
        <Route path="/:category/:productId" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};
