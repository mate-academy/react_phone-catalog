import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { NotFoundPage } from './modules/shared/components/NotFoundPage';
import { PicturesSlider } from './modules/HomePage/components/PicturesSlider';

const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<PicturesSlider />} />
          <Route path="phones" />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="tablets" />
          <Route path="accessories" />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

createRoot(document.getElementById('root') as HTMLElement).render(Root());
