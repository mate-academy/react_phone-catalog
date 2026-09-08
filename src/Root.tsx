import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import HomePage from './pages/HomePage/HomePage';
import { NotFound } from './pages/NotFound/NotFound';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import CartPage from './pages/CartPage/CartPage';
// eslint-disable-next-line max-len
import { ProductDetailsPage } from './pages/ProductDetailsPage/ProductDetailsPage';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import { ScrollToTop } from './components/ScrollToTop';

export const Root = () => {
  return (
    <HashRouter>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<Navigate replace to="/" />} />
          <Route path="/favourites" element={<FavoritesPage />} />
          <Route path="/cart" element={<CartPage />} />

          <Route path="/:category" element={<CategoryPage />} />

          <Route
            path="/:category/:productId"
            element={<ProductDetailsPage />}
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
