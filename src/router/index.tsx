import { HashRouter as Router, Navigate, Route, Routes } from 'react-router';
import { App } from '../App';
import { HomePage } from '../pages/Home';
import { PhonesPage } from '../pages/Phones';
import { TabletsPage } from '../pages/Tablets';
import { AccessoriesPage } from '../pages/Accessories';
import { ProductDetailsPage } from '../pages/ProductDetails';
import { FavouritesPage } from '../pages/Favourites';
import { CartPage } from '../pages/Cart';
import { NotFoundPage } from '../pages/NotFound';
import { ScrollToTop } from '../components/ScrollToTop';
import { FC } from 'react';

export const AppRouter: FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} errorElement={<NotFoundPage />}>
          <Route index element={<HomePage />} />
          <Route path="phones" element={<PhonesPage />} />
          <Route path="tablets" element={<TabletsPage />} />
          <Route path="accessories" element={<AccessoriesPage />} />
          <Route path="product/:productId" element={<ProductDetailsPage />} />
          <Route path="favourites" element={<FavouritesPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
