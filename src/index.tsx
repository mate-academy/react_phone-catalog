import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { App } from './App';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { HomePage } from './pages/HomePage/HomePage';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { TabletsPage } from './pages/TabletsPage/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage/AccessoriesPage';
import { ItemCardPage } from './pages/ItemCardPage/ItemCardPage';
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage';
import { CartPage } from './pages/CartPage/CartPage';

import './index.scss';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />

        <Route path="phones">
          <Route index element={<PhonesPage />} />
          <Route path=":productId" element={<ItemCardPage />} />
        </Route>

        <Route path="tablets">
          <Route index element={<TabletsPage />} />
          <Route path=":productId" element={<ItemCardPage />} />
        </Route>

        <Route path="accessories">
          <Route index element={<AccessoriesPage />} />
          <Route path=":productId" element={<ItemCardPage />} />
        </Route>

        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Route>

      <Route path="notfound" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="notfound" replace />} />
    </Routes>
  </Router>,
  document.getElementById('root'),
);
