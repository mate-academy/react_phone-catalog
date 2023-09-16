import {
  HashRouter as Router, Routes, Route,
} from 'react-router-dom';

import { App } from './App';
import { HomePage } from './pages/HomePage/HomePage';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { ProductPage } from './pages/ProductPage/ProductPage';
import { TabletsPage } from './pages/TabletsPage/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage/AccessoriesPage';
import { CartPage } from './pages/CartPage/CartPage';
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage';
import { PageNotFound } from './pages/PageNotFound/PageNotFound';
import { FavoritesProvider } from './store/FavoritesContext';
import { PhonesProvider } from './store/PhonesContext';
import { CartProvider } from './store/CartContext';

export const Root = () => (
  <Router>
    <PhonesProvider>
      <CartProvider>
        <FavoritesProvider>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />

              <Route path="phones">
                <Route index element={<PhonesPage />} />
                <Route path=":phoneId" element={<ProductPage />} />
              </Route>

              <Route path="tablets" element={<TabletsPage />} />
              <Route path="accessories" element={<AccessoriesPage />} />

              <Route path="cart" element={<CartPage />} />
              <Route path="favorites" element={<FavoritesPage />} />

              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </FavoritesProvider>
      </CartProvider>
    </PhonesProvider>
  </Router>
);
