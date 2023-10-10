import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { MenuItems } from './types/MenuItems';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path={MenuItems.Phones} element={<PhonesPage />} />
        <Route path={MenuItems.Tablets} element={<TabletsPage />} />
        <Route path={MenuItems.Accessories} element={<AccessoriesPage />} />
      </Route>
    </Routes>
  </Router>
);
