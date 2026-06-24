import { Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import { HomePage } from './modules/HomePage/components';
import { ProductPage } from './modules/ProductPage/components';
import { CartPage } from './modules/CartPage/components';
import { FavoritesPage } from './modules/FavoritesPage/components';
import { NotFoundPage } from './modules/NotFoundPage/components';
import { CatalogPage } from './modules/CatalogPage/components';
import { Layout } from './modules/Layout/components';

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="contacts" element={<Navigate to="/" replace />} />
          <Route path="rights" element={<Navigate to="/" replace />} />
          <Route
            path="phones"
            element={<CatalogPage category="phones" title="Mobile phones" />}
          />
          <Route
            path="tablets"
            element={<CatalogPage category="tablets" title="Tablets" />}
          />
          <Route
            path="accessories"
            element={<CatalogPage category="accessories" title="Accessories" />}
          />
          <Route path=":category/:productId" element={<ProductPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
};
