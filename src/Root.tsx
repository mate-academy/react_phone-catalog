import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useSearchParams,
} from 'react-router-dom';
import { App } from './App';

import { HomePage } from './pages/HomePage/HomePage';
import { Page404 } from './pages/Page404/Page404';
import { LookBookPage } from './pages/LookBookPage/LookBookPage';
import { getSearchWith } from './helpers/getSearchWith';

export const Root: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setSearchWith = (params: any) => {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  };

  useEffect(() => {
    setSearchWith({ page: null });
  }, []);

  return (
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
  );
};
