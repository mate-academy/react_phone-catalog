/* eslint-disable react/react-in-jsx-scope */
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { ShoppingCartPage } from './pages/ShoppingCartPage';
import { MenuPage } from './pages/MenuPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />

        <Route path="phones">
          <Route index element={<PhonesPage />} />
          <Route path=":itemId?" element={<ProductDetailsPage />} />
        </Route>

        <Route path="tablets">
          <Route index element={<TabletsPage />} />
          <Route path=":itemId?" element={<ProductDetailsPage />} />
        </Route>

        <Route path="accessories">
          <Route index element={<AccessoriesPage />} />
          <Route path=":itemId?" element={<ProductDetailsPage />} />
        </Route>

        <Route path="favourites" element={<FavouritesPage />} />
        <Route path="cart" element={<ShoppingCartPage />} />
        <Route path="menu" element={<MenuPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
