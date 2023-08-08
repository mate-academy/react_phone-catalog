import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import App from './App';
import { HomePage } from './pagas/HomePage';
import { ErrorPage } from './pagas/ErrorPage';
import { PhonesPage } from './pagas/PhonesPage';
import { TabletsPage } from './pagas/TabletsPage';
import { AccessoriesPage } from './pagas/AccessoriesPage';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route path="/phones">
            <Route index element={<PhonesPage />} />
          </Route>
          <Route path="/tablets">
            <Route index element={<TabletsPage />} />
          </Route>
          <Route path="/accessories">
            <Route index element={<AccessoriesPage />} />
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Route>

      </Routes>
    </Router>
  );
};
