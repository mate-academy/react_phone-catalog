import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { NotFoundPage } from './modules/shared/components/NotFoundPage';
import { HomePage } from './modules/HomePage';
import { Phones } from './modules/ProductPage/components/Phones';
import { Tablets } from './modules/ProductPage/components/Tablets';
import { Accessories } from './modules/ProductPage/components/Accessories';

const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<HomePage />} />
          <Route path="phones" element={<Phones />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="tablets" element={<Tablets />} />
          <Route path="accessories" element={<Accessories />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

createRoot(document.getElementById('root') as HTMLElement).render(Root());
