import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Layout } from './modules/shared/componets/Layout/Layout';
import { HomePage } from './modules/HomePage/HomePage';
import { FavoritesPage } from './modules/FavoritesPage/FavoritesPage';
import { ProductsPages } from './modules/ProductsPage/ProductsPages';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import './App.scss';
import { ShopingCartPage } from './modules/ShopingCartPage/ShopingCartPage';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route path="home" element={<Navigate to="/" replace />} />

        <Route
          path=":category/product/:productId"
          element={<ProductDetailsPage />}
        >
          <Route path="*" element={<p>notFound</p>} />
        </Route>

        <Route path=":category" element={<ProductsPages />} />

        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="cart" element={<ShopingCartPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
