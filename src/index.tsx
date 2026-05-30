import { createRoot } from 'react-dom/client';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage/HomePage';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { TabletsPage } from './pages/TabletsPage/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage/AccessoriesPage';
import { FavouritesPage } from './pages/FavouritesPage/FavouritesPage';
import { CartPage } from './pages/CartPage/CartPage';
import { CatalogProvider } from './CatalogContext';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { ProductPage } from './pages/ProductPage/ProductPage';

createRoot(document.getElementById('root') as HTMLElement).render(
  <CatalogProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="phones">
            <Route index element={<PhonesPage />} />
            <Route path=":itemId?" element={<ProductPage />} />
          </Route>
          <Route path="tablets">
            <Route index element={<TabletsPage />} />
            <Route path=":itemId?" element={<ProductPage />} />
          </Route>
          <Route path="accessories">
            <Route index element={<AccessoriesPage />} />
            <Route path=":itemId?" element={<ProductPage />} />
          </Route>
          <Route path="favourites" element={<FavouritesPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  </CatalogProvider>,
);
