import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import { PagesPath } from './types/PagesPath';
import { HomePage } from './modules/HomePage';
import { ProductsPage } from './modules/ProductsPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { FavouritesPage } from './modules/FavouritesPage';
import { CartPage } from './modules/CartPage';
import { CategoryRoute } from './CategoryRoute';
import { NotFoundPage } from './modules/NotFoundPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path={PagesPath.Home} element={<App />}>
        <Route index element={<HomePage />} />

        <Route path=":category" element={<CategoryRoute />}>
          <Route index element={<ProductsPage />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>

        <Route path={PagesPath.Favourites} element={<FavouritesPage />} />

        <Route path={PagesPath.Cart} element={<CartPage />} />

        <Route path="/notFound" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
