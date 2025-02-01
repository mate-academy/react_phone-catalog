import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';

import { App } from './App';
/* eslint-disable max-len */
import { HomePage } from './modules/HomePage/components/HomePage/HomePage';
import { ProductsProvider } from './modules/shared/_store/DataProvider';
import { ProductsPage } from './modules/ProductsPage/components/ProductsPage';
import { Category } from './_types/products';
/* eslint-disable max-len */
export const Root = () => (
  <Router>
    <ProductsProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="home" element={<Navigate to="/" />} />
          <Route index element={<HomePage />} />
          <Route
            path="phones"
            element={<ProductsPage category={Category.phones} />}
          />
          <Route
            path="tablets"
            element={<ProductsPage category={Category.tablets} />}
          />
          <Route
            path="accessories"
            element={<ProductsPage category={Category.accessories} />}
          />
          <Route path="cart" element={<h1>CART</h1>} />
          <Route path="favourites" element={<h1>favourites</h1>} />
          <Route path="menu" element={<h1>MENU</h1>} />
        </Route>
        <Route path="*" element={<p>Page Not Found</p>} />
      </Routes>
    </ProductsProvider>
  </Router>
);
