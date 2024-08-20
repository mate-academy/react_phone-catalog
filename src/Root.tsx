import { Routes, Route, HashRouter, Navigate } from 'react-router-dom';

import { App } from './App';

import { HomePage } from './components/HomePage/HomePage';
import { PhonesPage } from './components/PhonesPage/PhonesPage';
import { TabletsPage } from './components//TabletsPage/TabletsPage';
import { AccesoriesPage } from './components/AccesoriesPage';
import { ItemPage } from './components/ItemPage';

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="home">
            <Route index element={<HomePage />} />
          </Route>
          <Route path="phones">
            <Route index element={<PhonesPage />} />
            <Route path=":itemName" element={<ItemPage />} />
          </Route>
          <Route path="tablets">
            <Route index element={<TabletsPage />} />
            <Route path=":itemName" element={<ItemPage />} />
          </Route>
          <Route path="accessories">
            <Route index element={<AccesoriesPage />} />
            <Route path=":itemName" element={<ItemPage />} />
          </Route>
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
          <Route path="/" element={<Navigate to="/home" />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
