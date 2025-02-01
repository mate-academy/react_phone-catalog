import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import { App } from '../App/App';
import { HomePage } from '../HomePage/HomePage';
import { PhonePage } from '../PhonePage';
import { FavoritePage } from '../FavotitePage';
import { CartPage } from '../CartPage';
import { TabletPage } from '../TabletPage';
import { AccessoriesPage } from '../AccessoriesPage';
import { ProductDetailsPage } from '../ProductDetailsPage';
import { MenuItems } from '../../types/MenuItems';
import { PageNotFoundPage } from '../PageNotFoundPage';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<App />}
        >
          <Route
            index
            element={<HomePage />}
          />

          <Route
            path="/home"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />

          <Route path={`/${MenuItems.phones}`}>
            <Route
              index
              element={<PhonePage />}
            />
            <Route
              path=":productId"
              element={<ProductDetailsPage category={MenuItems.phones} />}
            />
          </Route>

          <Route path={`/${MenuItems.tablets}`}>
            <Route
              index
              element={<TabletPage />}
            />
            <Route
              path=":productId"
              element={<ProductDetailsPage category={MenuItems.tablets} />}
            />
          </Route>

          <Route path={`/${MenuItems.accessories}`}>
            <Route
              index
              element={<AccessoriesPage />}
            />
            <Route
              path=":productId"
              element={<ProductDetailsPage category={MenuItems.accessories} />}
            />
          </Route>

          <Route
            path="/favorite"
            element={<FavoritePage />}
          />

          <Route
            path="/cart"
            element={<CartPage />}
          />

          <Route
            path="*"
            element={<PageNotFoundPage />}
          />
        </Route>
      </Routes>
    </Router>
  );
};
