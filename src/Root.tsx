/* eslint-disable max-len */
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { HomePage } from './pages/HomePage/HomePage';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { TabletsPage } from './pages/TabletsPage/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage/AccessoriesPage';
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage';
import { CartPage } from './pages/CartPage/CartPage';
import { RedirectToHome } from './components/RedirectToHome/RedirectToHome';
import { ProductDetailsPage } from './pages/ProductDetailsPage/ProductDetailsPage';
import { StoreContext } from './store/StoreContext';

export const Root = () => {
  return (
    <Router>
      <StoreContext>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="home" element={<RedirectToHome />} />
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

            <Route path="favorites" element={<FavoritesPage />} />

            <Route path="cart" element={<CartPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </StoreContext>
    </Router>
  );
};
