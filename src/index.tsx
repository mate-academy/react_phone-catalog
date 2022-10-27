import ReactDOM from 'react-dom';
import {
  Routes,
  Route,
  Navigate,
  HashRouter as Router,
} from 'react-router-dom';
import './global.scss';
import { HomePage } from './pages/HomePage';
import { Phones } from './pages/Phones';
import { Tablets } from './pages/Tablets';
import { Accessories } from './pages/Accessories';
import { Favorites } from './pages/Favorites';
import { Cart } from './pages/Cart/Cart';
import { NotFoundPage } from './pages/NotFoundPage';
import App from './App';
import {
  ProductDetailsPage,
} from './pages/ProductDetailsPage/ProductDetailsPage';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="*" element={<NotFoundPage />} />
        <Route index element={<HomePage />} />
        <Route path="phones">
          <Route index element={<Phones />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>
        <Route path="tablets">
          <Route index element={<Tablets />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>
        <Route path="accessories">
          <Route index element={<Accessories />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>
        <Route path="favorites" element={<Favorites />} />
        <Route path="cart" element={<Cart />} />
        <Route path="home" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  </Router>,

  document.getElementById('root'),
);
