import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { CartPage } from './pages/CartPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="/phones" element={<PhonesPage />} />
        <Route path="/phones/:productId" element={<ProductDetailsPage />} />
        <Route path="/tablets" element={<TabletsPage />} />
        <Route path="/tablets/:productId" element={<ProductDetailsPage />} />
        <Route path="/accessories" element={<AccessoriesPage />} />
        <Route
          path="/accessories/:productId"
          element={<ProductDetailsPage />}
        />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
