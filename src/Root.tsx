import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { Category } from './types/Category';
import { ProductDetailsPage } from './pages/ProductDetailsPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path={Category.Phones} element={<PhonesPage />} />
        <Route path={Category.Tablets} element={<TabletsPage />} />
        <Route path={Category.Accessories} element={<AccessoriesPage />} />
        <Route path=":category/:productId" element={<ProductDetailsPage />} />
      </Route>
    </Routes>
  </Router>
);
