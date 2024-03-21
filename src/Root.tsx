import './Root.scss';
import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './components/App/App';
import { HomePage } from './pages/HomePage';
import { FavouritesPage } from './pages/FavouritesPage';
import { CartPage } from './pages/CartPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { ProductPage } from './pages/ProductPage';
import { getAccessories, getPhones, getTablets } from './utils/api';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="phones">
          <Route
            index
            element={
              <ProductPage
                fetchFunction={getPhones}
                pageTitle="Mobile phones"
              />
            }
          />
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>
        <Route
          path="tablets"
          element={
            <ProductPage fetchFunction={getTablets} pageTitle="Tablets" />
          }
        />
        <Route
          path="accessories"
          element={
            <ProductPage
              fetchFunction={getAccessories}
              pageTitle="Accessories"
            />
          }
        />
        <Route path="favourites" element={<FavouritesPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
