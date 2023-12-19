import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import App from './App';
import { TechProductsProvider } from './stores/TechProductsContext';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { NotFoundPagePage } from './pages/NotFoundPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { CartPage } from './pages/CartPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';

export const Root = () => {
  return (
    <Router>
      <TechProductsProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />

            <Route path="/phones">
              <Route index element={<PhonesPage />} />
            </Route>

            <Route path="/tablets">
              <Route index element={<TabletsPage />} />
            </Route>

            <Route path="/accessories">
              <Route index element={<AccessoriesPage />} />
            </Route>

            <Route path="/favourites">
              <Route index element={<FavouritesPage />} />
            </Route>

            <Route path="/cart">
              <Route index element={<CartPage />} />
            </Route>

            <Route
              path="/product/:productId"
              element={<ProductDetailsPage />}
            />

            <Route path="*" element={<NotFoundPagePage />} />
          </Route>
        </Routes>
      </TechProductsProvider>
    </Router>
  );
};
