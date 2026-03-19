import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { App } from '../App';
import { HomePage } from '../pages/Home';
import { ProductsPage } from '../pages/Products';
import { ProductDetailsPage } from '../pages/ProductDetails';
import { FavouritesPage } from '../pages/Favourites';
import { CartPage } from '../pages/Cart';
import { NotFoundPage } from '../pages/NotFound';
import { ScrollToTop } from '../components/ScrollToTop';
import type { FC } from 'react';

export const AppRouter: FC = () => {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} errorElement={<NotFoundPage />}>
          <Route index element={<HomePage />} />
          <Route path=":category" element={<ProductsPage />} />
          <Route path="product/:itemId" element={<ProductDetailsPage />} />
          <Route path="favourites" element={<FavouritesPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
