import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage';
import { PhonePage } from './modules/PhonePage/PhonePage';
import { TabletsPage } from './modules/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { GlobalStateProvider } from './Store';
import { CartPage } from './modules/CardPage';
import { InfoCartPage } from './modules/InfoCartPage';

export const Root = () => (
  <GlobalStateProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="phones" element={<PhonePage />} />
          <Route
            path="phones/:itemId?"
            element={<InfoCartPage category="phones" />}
          />
          <Route path="tablets" element={<TabletsPage />} />
          <Route
            path="tablets/:itemId?"
            element={<InfoCartPage category="tablets" />}
          />
          <Route path="accessories" element={<AccessoriesPage />} />
          <Route
            path="accessories/:itemId?"
            element={<InfoCartPage category="accessories" />}
          />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="card" element={<CartPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  </GlobalStateProvider>
);
