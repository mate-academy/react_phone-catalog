import { HashRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { StoreContext } from './store/StoreContext';
import { HomePage } from './pages/HomePage/HomePage';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { TabletsPage } from './pages/TabletsPage/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage/AccessoriesPage';
import { ProductDetailsPage } from
  './pages/ProductDetailsPage/ProductDetailsPage';
import { FavouritesPage } from './pages/FavouritesPage/FavouritesPage';
import { CartPage } from './pages/CartPage/CartPage';

export const Root = () => (
  <HashRouter>
    <StoreContext>
      <Routes>
        <Route path="/" element={<App />}>
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

          <Route path="favourites" element={<FavouritesPage />} />

          <Route path="cart" element={<CartPage />} />
        </Route>
      </Routes>
    </StoreContext>
  </HashRouter>
);
