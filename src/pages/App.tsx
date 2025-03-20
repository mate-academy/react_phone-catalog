import { Route, Routes } from 'react-router-dom';
import { NotFoundPage } from './NotFoundPage';
import { Header } from '../components/Header';

export const App = () => (
  <>
    <Header />
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    {/* Footer */}
  </>
);
