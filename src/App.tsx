/* eslint-disable max-len */
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './modules/HomePage/HomePage';
import { Layout } from './Layout';
import { ProductsPage } from './modules/ProductsPage/ProductsPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage/ProductDetailsPage';
import { FavoritesPage } from './modules/FavoritesPage/FavoritesPage';
import { CartPage } from './modules/CartPage/CartPage';
import { NotFoundPage } from './modules/NotFoundPage';
/* eslint-enable max-len */

export const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to={'/'} />} />

        <Route path="/phones" element={<ProductsPage />} />
        <Route path="/tablets" element={<ProductsPage />} />
        <Route path="/accessories" element={<ProductsPage />} />

        <Route path="/phones/:productId" element={<ProductDetailsPage />} />
        <Route path="/tablets/:productId" element={<ProductDetailsPage />} />
        <Route
          path="/accessories/:productId"
          element={<ProductDetailsPage />}
        />

        <Route path="/favourites" element={<FavoritesPage />} />
        <Route path="/cart" element={<CartPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
};
