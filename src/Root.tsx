import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { AppProvider } from './context/AppContext';
import { PhonePage } from './pages/PhonePage';
import { Breadcrumbs } from './components/BreadCrumbs/BreadCrumbs';

export const Root: React.FC = () => (
  <AppProvider>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/phones" element={<PhonePage />} />
          <Route path="*" element={<Breadcrumbs />} />
        </Route>
      </Routes>
    </HashRouter>
  </AppProvider>
);
