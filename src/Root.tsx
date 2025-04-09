import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { ProductPage } from './pages/ProductPage/ProductPage';
import { ProdDetailsPage } from './pages/ProdDetailsPage/ProdDetailsPage';
import { CartPage } from './pages/CartPage/CartPage';
import { FavouritesPage } from './pages/FavouritesPage/FavouritesPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { HomePage } from './pages/HomePage/123';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="phones">
            <Route index element={<ProductPage />} />
            <Route path=":itemId" element={<ProdDetailsPage />} />
          </Route>
          <Route path="tablets">
            <Route index element={<ProductPage />} />
            <Route path=":itemId" element={<ProdDetailsPage />} />
          </Route>
          <Route path="accessories">
            <Route index element={<ProductPage />} />
            <Route path=":itemId" element={<ProdDetailsPage />} />
          </Route>
          <Route path="cart" element={<CartPage />} />
          <Route path="favourites" element={<FavouritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
