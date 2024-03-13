/* eslint-disable max-len */
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomeRedirect } from './components/HomeRedirect/HomeRedirect';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { HomePage } from './pages/HomePage/HomePage';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage/ProductDetailsPage';
import { StoreContext } from './store/StoreContext';
import { TabletsPage } from './pages/TabletsPage/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage/AccessoriesPage';
import { FavouritesPage } from './pages/FavouritesPage/FavouritesPage';
import { CartPage } from './pages/CartPage/CartPage';
import { PagesMenu } from './pages/PagesMenu/PagesMenu';

export const Root = () => {
  return (
    <Router>
      <StoreContext>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="home" element={<HomeRedirect />} />
            <Route index element={<HomePage />} />

            <Route path="phones">
              <Route index element={<PhonesPage />} />
              <Route path=":productId?" element={<ProductDetailsPage />} />
            </Route>

            <Route path="tablets">
              <Route index element={<TabletsPage />} />
              <Route path=":productId?" element={<ProductDetailsPage />} />
            </Route>

            <Route path="accessories">
              <Route index element={<AccessoriesPage />} />
              <Route path=":productId?" element={<ProductDetailsPage />} />
            </Route>

            <Route path="menu" element={<PagesMenu />} />

            <Route path="favourites" element={<FavouritesPage />} />

            <Route path="cart" element={<CartPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </StoreContext>
    </Router>
  );
};
