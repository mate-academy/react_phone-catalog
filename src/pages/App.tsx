import { Route, Routes } from 'react-router-dom';
import { NotFoundPage } from './NotFoundPage';
import { Layout } from '@components/Layout';
import { ROUTES } from '@routes/index';

export const App = () => (
  <Routes>
    <Route path={ROUTES.HOME} element={<Layout />}>
      <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
    </Route>
  </Routes>
);
