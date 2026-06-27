import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import './App.scss';
import { HomePage } from './modules/HomePage';
import { CatalogPage } from './modules/CatalogPage/CatalogPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { CartPage } from './modules/CartPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="phones" element={<CatalogPage />} />
          <Route path="tablets" element={<CatalogPage />} />
          <Route path="accessories" element={<CatalogPage />} />
          <Route path="product/:productId" element={<ProductDetailsPage />} />

          <Route path="cart" element={<CartPage />} />

          <Route path="favorites" element={<FavoritesPage />} />

          <Route path="*" element={<h1>Page not found</h1>} />
        </Route>
      </Routes>
    </Router>
  );
};
