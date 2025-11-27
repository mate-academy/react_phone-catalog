import { Routes, Route } from 'react-router-dom';
import HomePage from '@/modules/HomePage/components/HomePage';
import { Layout } from '@/modules/shared/components/Layout/Layout';
import CatalogPage from '@/modules/shared/components/CatalogPage/CatalogPage';
import { getProducts } from '@/api/api';
import ProductPage from '@/modules/ProductPage/ProductPage';

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/:category"
          element={<CatalogPage fetchReq={getProducts} />}
        />
        <Route path="/:category/:productSlug" element={<ProductPage fetchReq={getProducts}/>} />
      </Route>

      {/* 404 fallback */}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
};
