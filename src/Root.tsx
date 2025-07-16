import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage';
import { CatalogPage } from './modules/CatalogPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { DataProvider } from './context/DataContext';

export const Root = () => {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </DataProvider>
  );
};
