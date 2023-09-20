import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './components/HomePage';
import { PhonesPage } from './components/PhonesPage';
import { TabletsPage } from './components/TabletsPage';
import { AccessoriesPage } from './components/AccessoriesPage';
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
