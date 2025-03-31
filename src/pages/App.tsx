import { Route, Routes } from 'react-router-dom';
import { NotFoundPage } from './NotFoundPage';
import { Layout } from '@components/Layout';
import { ROUTES } from '@routes/index';
import { HomePage } from './HomePage';
import { ProductDetailsPage } from './ProductDetailsPage';

export const App = () => (
  <Routes>
    <Route path={ROUTES.HOME} element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route
        path={ROUTES.PRODUCT_DETAILS(':category', ':productId')}
        element={<ProductDetailsPage />}
      />
      <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
    </Route>
  </Routes>
);
