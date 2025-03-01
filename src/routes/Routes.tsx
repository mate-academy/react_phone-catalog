import { Route, Routes } from 'react-router-dom';
import { NotFoundPage } from '../modules/NotFoundPage/components';
import { PhonesPage } from '../modules/PhonesPage/components';
import { HomePage } from '../modules/HomePage/components/HomePage';
import { TabletsPage } from '../modules/TabletsPage/components';
import { AccessoriesPage } from '../modules/AccessoriesPage/components';
import { Layout } from '../components/Layout/Layout';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="phones" element={<PhonesPage />} />
        <Route path="tablets" element={<TabletsPage />} />
        <Route path="accessories" element={<AccessoriesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
