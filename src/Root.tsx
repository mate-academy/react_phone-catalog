import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { Catalog } from './pages/Catalog';
import { NotFoundPage } from './pages/NotFoundPage';

export const Root = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="phones" element={<Catalog />} />
        <Route path="tablets" element={<Catalog />} />
        <Route path="accessories" element={<Catalog />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
