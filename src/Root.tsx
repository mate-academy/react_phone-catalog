import { Route, Routes, Navigate } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './moduls/HomePage';

export const Root = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="home" element={<Navigate to="/" replace />} />
      <Route path="*" element={<p>Page not found</p>} />
    </Route>
  </Routes>
);
