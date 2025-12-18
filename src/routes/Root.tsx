import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { App } from '../App';
import { NotFoundPage } from '../modules/NotFoundPage';
import { HomePage } from '../modules/HomePage';

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />}></Route>
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />}></Route>
        </Route>
      </Routes>
    </HashRouter>
  );
};
