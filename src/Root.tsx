import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';

import { App } from './App';
/* eslint-disable max-len */
import { PhonesPage } from './modules/PhonesPage/components/PhonesPage/PhonesPage';
import { HomePage } from './modules/HomePage/components/HomePage/HomePage';
import { TabletsPage } from './modules/TabletsPage/components/TabletsPage/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage/components/AccessoriesPage/AccessoriesPage';
import { ProductsProvider } from './modules/shared/_store/DataProvider';
/* eslint-disable max-len */
export const Root = () => (
  <Router>
    <ProductsProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="home" element={<Navigate to="/" />} />
          <Route index element={<HomePage />} />
          <Route path="phones" element={<PhonesPage />} />
          <Route path="tablets" element={<TabletsPage />} />
          <Route path="accessories" element={<AccessoriesPage />} />
          <Route path="cart" element={<h1>CART</h1>} />
          <Route path="favourites" element={<h1>favourites</h1>} />
          <Route path="menu" element={<h1>MENU</h1>} />
        </Route>
        <Route path="*" element={<p>Page Not Found</p>} />
      </Routes>
    </ProductsProvider>
  </Router>
);
