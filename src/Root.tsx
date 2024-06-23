import { Routes, Route, Navigate } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { AsideMenu } from './components/AsideMenu';
import { PhonesPage } from './pages/PhonesPage';

export const Root = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="/home" element={<Navigate to="/" />} />
      <Route path="/menu" element={<AsideMenu />} />
      <Route path="/phones" element={<PhonesPage />} />
    </Route>
    <Route path="*" element={<h1 className="title">Page not found</h1>} />
  </Routes>
);
