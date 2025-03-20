import { Route, Routes } from 'react-router-dom';
import { NotFoundPage } from '../modules/NotFoundPage/components';
import { HomePage } from '../modules/HomePage/components/HomePage';
import { Layout } from '../components/Layout/Layout';
import { ProductsPage } from '../modules/ProductsPage/components';
import { ProductPage } from '../modules/ProductPage/components';
import { Favorites } from '../modules/Favorites';
import { CartPage } from '../modules/CartPage/components';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path=":category" element={<ProductsPage />} />
        <Route path=":category/:product" element={<ProductPage />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="cart-page" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
