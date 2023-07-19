import ReactDOM from 'react-dom';
import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';

import App from './App';
import { HomePage } from './pages/HomePage/HomePage';
import { ProductsPage } from './pages/ProductsPage/ProductsPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { Cart } from './pages/Cart/Cart';
import { Favourites } from './pages/Favourites';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="phones">
          <Route index element={<ProductsPage productType="phone" />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>
        <Route path="tablets">
          <Route index element={<ProductsPage productType="tablet" />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>
        <Route path="accessories">
          <Route index element={<ProductsPage productType="accessory" />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>
        <Route path="cart" element={<Cart />} />
        <Route path="favourites" element={<Favourites />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>,
  document.getElementById('root'),
);
