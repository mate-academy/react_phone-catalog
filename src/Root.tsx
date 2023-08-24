import React from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';

import { HomePage } from './pages/HomePage/HomePage';
import { Page404 } from './pages/Page404/Page404';
import { LookBookPage } from './pages/LookBookPage/LookBookPage';

export const Root: React.FC = () => (
  <Router>
    <Routes>
      <Route
        path="/"
        element={<App />}
      >
        <Route
          index
          element={<HomePage />}
        />

        <Route
          path="home"
          element={<Navigate to="/" replace />}
        />

        <Route
          path="lookBook"
          element={<LookBookPage />}
        />

        <Route
          path="*"
          element={<Page404 />}
        />
      </Route>
    </Routes>
  </Router>
);
