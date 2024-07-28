import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage';
import { NotFoundPage } from './modules/NotFoundPage';
import { FavouritesPage } from './modules/FavouritesPage';
import { CartPage } from './modules/CartPage';
import { MenuProvider } from './store/MenuProvider';
import { CatalogPage } from './modules/CatalogPage/CatalogPage';
import { ProductProvider } from './store/ProductProvider';

export const Root = () => (
  <ProductProvider>
    <MenuProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="home" element={<Navigate to={'/'} replace />} />
            <Route path="phones" element={<CatalogPage category="phones" />} />
            <Route
              path="tablets"
              element={<CatalogPage category="tablets" />}
            />
            <Route
              path="accessories"
              element={<CatalogPage category="accessories" />}
            />

            <Route path="favourites" element={<FavouritesPage />} />
            <Route path="cart" element={<CartPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </MenuProvider>
  </ProductProvider>
);
