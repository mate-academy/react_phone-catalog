import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { FavouritesPage } from './pages/FavouritesPage';
import { CartPage } from './pages/CartPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { ProductsPage } from './pages/ProductsPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="/phones" element={<ProductsPage />} />
        <Route path="/phones/:productId" element={<ProductDetailsPage />} />
        <Route path="/tablets" element={<ProductsPage />} />
        <Route path="/tablets/:productId" element={<ProductDetailsPage />} />
        <Route path="/accessories" element={<ProductsPage />} />
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
