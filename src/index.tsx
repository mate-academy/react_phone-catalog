import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import { App } from './App';
import { HomePage, NotFoundPage } from './pages';
import { Cart } from './pages/Cart/Cart';
import { CatalogList } from './pages/CatalogList/CatalogList';
import { FavouritesPage } from './pages/FavouritesPage/FavouritesPage';
import {
  ProductDetailsPage,
} from './pages/ProductDetailsPage/ProductDetailsPage';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />

        <Route path="/phones" element={<CatalogList title="Mobile Phones" />} />
        <Route path="/phones/*" element={<ProductDetailsPage />} />
        <Route path="/tablets" element={<CatalogList title="Tablets" />} />
        <Route path="/tablets/*" element={<ProductDetailsPage />} />
        <Route
          path="/accessories"
          element={<CatalogList title="Accessories" />}
        />
        <Route path="/accessories/*" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favorites" element={<FavouritesPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>,
  document.getElementById('root'),
);
