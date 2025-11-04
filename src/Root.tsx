import React from 'react';
import { Routes, Route, HashRouter as Router } from 'react-router-dom';
import { App } from './App';
import { MainPage } from './pages/MainPage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { Accessories } from './pages/AccessoriesPage';
export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<MainPage />} />
          <Route path="phones" element={<PhonesPage />} />
          <Route path="tablets" element={<TabletsPage />} />
          <Route path="accessories" element={<Accessories />} />
          <Route path="*" element={<MainPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
