import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage/HomePage';
import { CartPage } from './modules/CartPage/CartPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import productsData from '../public/api/products.json';
import { Product } from './modules/shared/types';
import { ProductsPage } from './modules/ProductsPage/ProductsPage';
import { FavouritesPage } from './modules/FavouritesPage';

const products = productsData as Product[];

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage products={products} />} />
        <Route path="home" element={<Navigate to="/" replace />} />

        <Route
          path="phones"
          element={<ProductsPage category="phones" title="Mobile phones" />}
        />
        <Route
          path="tablets"
          element={<ProductsPage category="tablets" title="Tablets" />}
        />
        <Route
          path="accessories"
          element={<ProductsPage category="accessories" title="Accessories" />}
        />

        <Route path="products/:productId" element={<ProductDetailsPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="favourites" element={<FavouritesPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);
