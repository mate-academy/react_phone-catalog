import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from '../../app/store';

import { App } from '../App';
import { HomePage } from '../HomePage';
import { NotFoundPage } from '../NotFoundPage';
import { FavouritesPage } from '../FavouritesPage';
import { CartPage } from '../CartPage';
import { CatalogPage } from '../CatalogPage';
import { ProductDetailsPage } from '../ProductDetailsPage';
export const Root = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to={'/'} replace />} />
          <Route path="phones">
            <Route index element={<CatalogPage category="phones" />} />
            <Route path={':productId'} element={<ProductDetailsPage />} />
          </Route>
          <Route path="tablets">
            <Route index element={<CatalogPage category="tablets" />} />
            <Route path={':productId'} element={<ProductDetailsPage />} />
          </Route>
          <Route path="accessories">
            <Route index element={<CatalogPage category="accessories" />} />
            <Route path={':productId'} element={<ProductDetailsPage />} />
          </Route>

          <Route path="favourites" element={<FavouritesPage />} />
          <Route path="cart" element={<CartPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  </Provider>
);
