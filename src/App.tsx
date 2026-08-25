import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { CategoryPage } from './modules/CategoryPage/CategoryPage';
import { HomePage } from './modules/HomePage';
import { NotFoundPage } from './modules/NotFoundPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { CartPage } from './modules/CartsPage/CartsPage';

export const App = () => (
  <div className="content">
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/phones" element={<CategoryPage category="phones" />} />
      <Route path="/tablets" element={<CategoryPage category="tablets" />} />
      <Route
        path="/accessories"
        element={<CategoryPage category="accessories" />}
      />
      <Route path="/product/:productId" element={<ProductDetailsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </div>
);
