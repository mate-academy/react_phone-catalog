import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import App from './App';
import { HomePage } from './pages/HomePage';
import { getPhones } from './api/phone';
import { Phone } from './type/Phone';
import './App.scss';
import { PhonesPage } from './pages/PhonesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { CartPage } from './pages/CartPage';
import { NotFoundPage } from './pages/PageNotFound';

export const Root: React.FC = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [isLoading, setiSLoading] = useState(true);

  useEffect(() => {
    getPhones()
      .then(setPhones)
      .finally(() => setiSLoading(false));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route
            index
            element={<HomePage phones={phones} isLoading={isLoading} />}
          />

          <Route
            path="phones"
          >
            <Route
              index
              element={<PhonesPage phones={phones} isLoading={isLoading} />}
            />
            <Route
              path=":phoneId"
              element={<ProductDetailsPage phones={phones} />}
            />
          </Route>

          <Route
            path="tablets"
            element={<TabletsPage isLoading={isLoading} />}
          />
          <Route
            path="accessories"
            element={<AccessoriesPage isLoading={isLoading} />}
          />
          <Route
            path="favorites"
            element={<FavoritesPage isLoading={isLoading} />}
          />
          <Route
            path="cart"
            element={<CartPage isLoading={isLoading} />}
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};
