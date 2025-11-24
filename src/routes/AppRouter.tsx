import { Routes, Route } from 'react-router-dom';
import HomePage from '@/modules/HomePage/components/HomePage';
import { Layout } from '@/modules/shared/components/Layout/Layout';
import CatalogPage from '@/modules/shared/components/CatalogPage/CatalogPage';
import { getAccessories, getPhones, getTablets } from '@/api/api';

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />

        {/* Define explicit paths for each category */}
        <Route path="phones" element={<CatalogPage fetchReq={getPhones} />} />
        <Route path="tablets" element={<CatalogPage fetchReq={getTablets} />} />
        <Route
          path="accessories"
          element={<CatalogPage fetchReq={getAccessories} />}
        />
      </Route>
    </Routes>
  );
};
