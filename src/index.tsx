import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { PageNotFound } from './pages/PageNotFound';

// Динамічний імпорт компонентів
const HomePage = lazy(() => import('./pages/HomePage'));
const PhonesPage = lazy(() => import('./pages/PhonesPage'));
const TabletsPage = lazy(() => import('./pages/TabletsPage'));
const AccessoriesPage = lazy(() => import('./pages/AccessoriesPage'));

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <Suspense fallback={<div>Loading...</div>}>
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
    </Suspense>
  </HashRouter>,
);
