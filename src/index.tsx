import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PageNotFound } from './pages/PageNotFound';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/home" element={<Navigate to="/" />} />
        <Route index element={<HomePage />} />
        <Route path="/phones" element={<PhonesPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  </HashRouter>,
);
