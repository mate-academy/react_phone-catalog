import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage';
import { ProductsPage } from './modules/ProductsPage';
import { PagesPath } from './types/PagesPath';

export const Root = () => (
  <Router>
    <Routes>
      <Route path={PagesPath.Home} element={<App />}>
        <Route index element={<HomePage />} />
        <Route path={PagesPath.Phones} element={<ProductsPage />} />
        <Route path={PagesPath.Tablets} element={<ProductsPage />} />
        <Route path={PagesPath.Accessories} element={<ProductsPage />} />
      </Route>
    </Routes>
  </Router>
);
