import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/homePage';
import { NotFoundPage } from './pages/notFoundPage';
import { PhonesPage } from './pages/phonesPage';
import { TabletsPage } from './pages/tabletsPage';
import { AccessoriesPage } from './pages/accessoriesPage';
import { FavouritesPage } from './pages/favouritesPage';
import { CartPage } from './pages/cartPage';
import { ProductDetailsPage } from './pages/productDetailsPage';
import { DataProvider } from './helpers/DataContext';

export const Root = () => {
  return (
    <Router>
      <DataProvider>
        <Routes>
          <Route path="/" element={<App />}>

            <Route index element={<HomePage />} />

            <Route path="phones">
              <Route index element={<PhonesPage />} />
              <Route path=":phoneId" element={<ProductDetailsPage />} />
            </Route>

            <Route path="tablets">
              <Route index element={<TabletsPage />} />
              <Route path=":tabletId" element={<ProductDetailsPage />} />
            </Route>

            <Route path="accessories">
              <Route index element={<AccessoriesPage />} />
              <Route path=":accessoriesId" element={<ProductDetailsPage />} />
            </Route>

            <Route path="favourites">
              <Route index element={<FavouritesPage />} />
              <Route path=":phoneId" element={<ProductDetailsPage />} />
            </Route>

            <Route path="cart">
              <Route index element={<CartPage />} />
            </Route>

            <Route
              path="home"
              element={<Navigate to="/" replace />}
            />

          </Route>
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </DataProvider>
    </Router>
  );
};
