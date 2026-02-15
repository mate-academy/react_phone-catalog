import { Navigate, Route, Routes } from 'react-router-dom';
import { NotFoundPage } from '../modules/NotFoundPage/components';
import { HomePage } from '../modules/HomePage/components/HomePage';
import { Layout } from '../components/Layout/Layout';
import { ProductsPage } from '../modules/ProductsPage/components';
import { ProductDetailsPage } from '../modules/ProductDetailsPage/components';
import { Favorites } from '../modules/Favorites';
import { CartPage } from '../modules/CartPage/components';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path=":category" element={<ProductsPage />} />
        <Route path=":category/:product" element={<ProductDetailsPage />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="cart-page" element={<CartPage />} />
        <Route path="not-found" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Route>
    </Routes>
  );
};
