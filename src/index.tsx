import { createRoot } from 'react-dom/client';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';

import { App } from './App';
import { HomePage } from './pages/HomePage';

import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { PhonesPage } from './pages/PhonesPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { MenuPage } from './pages/MenuPage';
// import { ProductsList } from './components/ProductsList';

createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="phones">
            <Route index element={<PhonesPage />} />
            <Route path=":productId?" element={<ProductDetailsPage />} />
            <Route path=":pageNumber?" />
          </Route>

          <Route path="tablets" element={<TabletsPage />} />
          <Route path="accessories" element={<AccessoriesPage />} />

          <Route path="cart" element={<CartPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="menu" element={<MenuPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>,
  );
