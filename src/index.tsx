import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PageNotFound } from './pages/PageNotFound';

import PhonesPage from './pages/PhonesPage';
import HomePage from './pages/HomePage';
import TabletsPage from './pages/TabletsPage';
import AccessoriesPage from './pages/AccessoriesPage';

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/home" element={<Navigate to="/" />} />
        <Route index element={<HomePage />} />
        <Route path="/phones" element={<PhonesPage />} />
        <Route path="/tablets" element={<TabletsPage />} />
        <Route path="/accessories" element={<AccessoriesPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  </HashRouter>,
);
