// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PhonesPage } from './modules/PhonesPage/PhonesPage';
import { HomePage } from './modules/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ScrollToTop } from './components/ScrollToTop';
import './i18n/i18n';
import { ProductDetailsPage } from './pages/ProductDetailsPage';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <HashRouter>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />

        <Route path="home" element={<Navigate to="/" replace />} />

        <Route path="phones">
          <Route index element={<PhonesPage />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </HashRouter>,
  // </StrictMode>,
);
