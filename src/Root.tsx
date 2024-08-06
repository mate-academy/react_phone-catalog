import { App } from './App';
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { ProductsPage } from './pages/ProductsPage/ProductsPage';
import { DetailProductPage } from './pages/DetailProductPage';
import { ProductType } from './types/ProductType';
import { BasketPage } from './pages/BasketPage';
import { FavouritePage } from './pages/FavouritePage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />

        <Route path="home" element={<Navigate to="/" replace />} />

        <Route path="phones">
          <Route index element={<ProductsPage type={ProductType.Phones} />} />
          <Route path=":productId" element={<DetailProductPage />} />
        </Route>

        <Route path="tablets">
          <Route index element={<ProductsPage type={ProductType.Tablets} />} />
          <Route path=":productId" element={<DetailProductPage />} />
        </Route>

        <Route path="accessories">
          <Route
            index
            element={<ProductsPage type={ProductType.Accessories} />}
          />
          <Route path=":productId" element={<DetailProductPage />} />
        </Route>

        <Route path="favourites" element={<FavouritePage />} />
        <Route path="basket" element={<BasketPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
