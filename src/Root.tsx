import {
  Route, HashRouter as Router, Routes, Navigate,
} from 'react-router-dom';
import App from './App';
import { HomePage } from './pages/HomePage/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { AccessoriesPage } from './pages/AccessoriesPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="/phones" element={<PhonesPage />} />
        <Route path="/tablets" element={<TabletsPage />} />
        <Route path="/accessories" element={<AccessoriesPage />} />
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </Router>
);
