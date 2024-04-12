import React from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { App } from './App';
import { CatalogProvider } from './pages/CatalogContext';
import { HomePage } from './pages/HomePage/HomePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';

export const Root = () => (
  <CatalogProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />

          <Route path="/phones/:page?">
            <Route index element={<PhonesPage />} />
          </Route>
          <Route path="/tablets">
          </Route>
          <Route path="/accessories">
          </Route>
          <Route path="/favorites">
          </Route>
          <Route path="/cart">
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  </CatalogProvider>
);