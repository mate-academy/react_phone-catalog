import { Route, Routes } from 'react-router-dom';
import { NotFoundPage } from './NotFoundPage';

export const App = () => (
  <Routes>
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);
