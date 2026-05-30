import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import { FavoritesPage } from './pages/FavoritesPage';
import { CartPage } from './pages/CartPage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { HomePage } from './pages/HomePage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import notFoundPageImg from '../src/images/page-not-found.png';

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/">
            <Route index element={<HomePage />} />
          </Route>
          <Route path="/phones">
            <Route index element={<PhonesPage />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>
          <Route path="/tablets">
            <Route index element={<TabletsPage />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>
          <Route path="/accessories">
            <Route index element={<AccessoriesPage />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>
          <Route path="/burger_menu" element={<App />} />
          <Route path="/favorites">
            <Route index element={<FavoritesPage />} />
          </Route>
          <Route path="/cart">
            <Route index element={<CartPage />} />
          </Route>

          <Route
            path="*"
            element={
              <NotFoundPage
                title="Ooops...Page not found"
                image={notFoundPageImg}
              />
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};
