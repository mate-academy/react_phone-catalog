import { Navigate, Route, Routes } from 'react-router-dom';

import { CartPage } from './modules/CartPage';
import { CategoryPage } from './modules/CategoryPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { HomePage } from './modules/HomePage';
import { NotFoundPage } from './modules/NotFoundPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';

import './App.scss';

export const App = () => {
  return (
    <div className="App">
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route path="/phones" element={<CategoryPage />} />
          <Route path="/tablets" element={<CategoryPage />} />
          <Route path="/accessories" element={<CategoryPage />} />

          <Route path="/product/:productId" element={<ProductDetailsPage />} />

          <Route path="/cart" element={<CartPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
};
