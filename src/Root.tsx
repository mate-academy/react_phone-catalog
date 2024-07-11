import { Route, Routes, HashRouter, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { App } from './App';
import { NotFoundPage } from './pages/NotFoundPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
// eslint-disable-next-line max-len
import { ProductDetailsPage } from './pages/ProductDetailsPage/ProductDetailsPage';
import { NotFoundProduct } from './pages/NotFoundProduct';

export const Root = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />

        <Route path="phones" element={<PhonesPage />} />
        <Route path="tablets" element={<TabletsPage />} />
        <Route path="accessories" element={<AccessoriesPage />} />

        <Route path=":category/:productId" element={<ProductDetailsPage />} />

        <Route path="*" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundProduct />} />
      </Route>
    </Routes>
  </HashRouter>
);
