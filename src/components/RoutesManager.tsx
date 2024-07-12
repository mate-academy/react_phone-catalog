import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import React from 'react';
import { App } from '../App';
import { HomePage } from './HomePage/HomePage';
import { PhonesPage } from './PhonesPage/PhonesPage';
import { TabletsPage } from './TabletsPage/TabletsPage';
import { AccessoriesPage } from './AccessoriesPage/AccessoriesPage';
import { LikedPage } from './LikedPage/LikedPage';
import { CartPage } from './CartPage/CartPage';
import { PhoneInfoPage } from './PhoneInfoPage/PhoneInfoPage';
import { TabletsInfoPage } from './TabletsInfoPage/TabletsInfoPage';
import { AccessoriesInfoPage } from './AccessoriesInfoPage/AccessoriesInfoPage';
import { PageNotFound } from './PageNotFound/PageNotFound';

export const RoutesManager = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="home" element={<Navigate to={'/'} replace />} />
          <Route index element={<HomePage />} />
          <Route path="phones" element={<PhonesPage />} />
          <Route path="phones/:phoneId" element={<PhoneInfoPage />} />
          <Route path="tablets" element={<TabletsPage />} />
          <Route path="tablets/:tabletId" element={<TabletsInfoPage />} />
          <Route path="accessories" element={<AccessoriesPage />} />
          <Route
            path="accessories/:accessoryId"
            element={<AccessoriesInfoPage />}
          />
          <Route path="liked" element={<LikedPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};
