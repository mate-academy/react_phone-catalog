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
import { ItemCardPage } from './modules/ItemCardPage';

export const Root = () => (
  <ProductProvider>
    <MenuProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="home" element={<Navigate to={'/'} replace />} />
            <Route path="phones">
              <Route index element={<CatalogPage category="phones" />} />
              <Route path={':productId'} element={<ItemCardPage />} />
            </Route>
            <Route path="tablets">
              <Route index element={<CatalogPage category="tablets" />} />
              <Route path={':productId'} element={<ItemCardPage />} />
            </Route>
            <Route path="accessories">
              <Route index element={<CatalogPage category="accessories" />} />
              <Route path={':productId'} element={<ItemCardPage />} />
            </Route>

            <Route path="favourites" element={<FavouritesPage />} />
            <Route path="cart" element={<CartPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </MenuProvider>
  </ProductProvider>
);
