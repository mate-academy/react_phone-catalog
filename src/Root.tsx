import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { HomePage } from '@HomePage';
import { ProductsPage } from './modules/ProductsPage/ProductsPage';

import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';
import { ProductCard } from './modules/ProductCard/ProductCard';
import { ShoppingCart } from './modules/ShoppingCart/ShoppingCart';
import { FavoritesPage } from './modules/FavoritesPage/FavoritesPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="phones">
          <Route index element={<ProductsPage />} />
          <Route path=":productId?" element={<ProductCard />} />
        </Route>

        <Route path="tablets">
          <Route index element={<ProductsPage />} />
          <Route path=":productId?" element={<ProductCard />} />
        </Route>

        <Route path="accessories">
          <Route index element={<ProductsPage />} />
          <Route path=":productId?" element={<ProductCard />} />
        </Route>

        <Route path="cart" element={<ShoppingCart />} />

        <Route path="favorites" element={<FavoritesPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);
