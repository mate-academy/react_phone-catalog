import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { NotFoundPage } from './Components/NotFoundPage/NotFoundPage';
import { PicturesSlider } from './Components/Home/PicturesSlider';

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
