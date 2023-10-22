import { HashRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { HomePage } from '../pages/HomePage';
import { PhonesPage } from '../pages/PhonesPage';
import { TabletsPage } from '../pages/TabletsPage';
import { AccessoriesPage } from '../pages/AccessoriesPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';

export const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="phones" element={<PhonesPage />} />
          <Route path="tablets" element={<TabletsPage />} />
          <Route path="accessories" element={<AccessoriesPage />} />
          <Route path="/product/:productId" element={<ProductDetailsPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
