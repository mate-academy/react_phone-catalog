import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NotFoundPage } from './components/NotFoundPage';
import { AccessoriesPage } from './components/AccessoriesPage';
import { TabletsPage } from './components/TabletsPage';
import { PhonesPage } from './components/PhonesPage';
import { HomePage } from './components/HomePage';
import { App } from './App';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="/phones" element={<PhonesPage />} />
        <Route path="/tablets" element={<TabletsPage />} />
        <Route path="/accessories" element={<AccessoriesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
