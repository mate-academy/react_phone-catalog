import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage';
import { NotFoundPage } from './modules/NotFoundPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { AccessoriesPage } from './modules/ProductPages/AccessoriesPage';
import { PhonesPage } from './modules/ProductPages/PhonesPage';
import { TabletsPage } from './modules/ProductPages/TabletsPage';
import { CartPage } from './modules/CartPage';
import { FavoritePage } from './modules/FavoritePage';
import { PagesType } from './types/PagesType';
// import { replace } from 'cypress/types/lodash';

export const Root = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path={`${PagesType.home}`} element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to={PagesType.home} />} />
          <Route path={`${PagesType.phones}`} element={<PhonesPage />}>
            <Route
              path={`${PagesType.phones}/:productId`}
              element={<ProductDetailsPage />}
            />
          </Route>
          <Route path={`${PagesType.tablets}`} element={<TabletsPage />}>
            <Route
              path={`${PagesType.tablets}/:productId`}
              element={<ProductDetailsPage />}
            />
          </Route>
          <Route
            path={`${PagesType.accessories}`}
            element={<AccessoriesPage />}
          >
            <Route
              path={`${PagesType.accessories}/:productId`}
              element={<ProductDetailsPage />}
            />
          </Route>

          <Route path={`${PagesType.cart}`} element={<CartPage />} />
          <Route path={`${PagesType.favorites}`} element={<FavoritePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route> */}
        <Route path={`${PagesType.home}`} element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to={PagesType.home} />} />

          <Route path={PagesType.phones} element={<PhonesPage />} />
          <Route path={PagesType.tablets} element={<TabletsPage />} />
          <Route path={PagesType.accessories} element={<AccessoriesPage />} />

          <Route
            path={`${PagesType.phones}/:productId`}
            element={<ProductDetailsPage />}
          />
          <Route
            path={`${PagesType.tablets}/:productId`}
            element={<ProductDetailsPage />}
          />
          <Route
            path={`${PagesType.accessories}/:productId`}
            element={<ProductDetailsPage />}
          />

          <Route path={PagesType.cart} element={<CartPage />} />
          <Route path={PagesType.favorites} element={<FavoritePage />} />

          {/* <Route path="404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} /> */}

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
