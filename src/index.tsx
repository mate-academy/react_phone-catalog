/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import { createRoot } from 'react-dom/client';
import { Helmet } from 'react-helmet';

import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { Accessories } from './pages/AccessoriesPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { FavoritesPage } from './pages/FavouritesPage';
import { CartPage } from './pages/CartPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';

createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <>
      <Helmet>
        <link
          rel="icon"
          href={require('./images/favicon.svg').default}
          type="image/x-icon"
        />
      </Helmet>

      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />

            <Route path="home" element={<Navigate to="/" replace />} />

            <Route path="phones" element={<PhonesPage />} />

            <Route path="phones/:itemId" element={<ProductDetailsPage />} />

            <Route path="tablets" element={<TabletsPage />} />

            <Route path="tablets/:itemId" element={<ProductDetailsPage />} />

            <Route path="accessories" element={<Accessories />} />

            <Route
              path="accessories/:itemId"
              element={<ProductDetailsPage />}
            />

            <Route path="favourities" element={<FavoritesPage />} />

            <Route path="cart" element={<CartPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </>,
  );
