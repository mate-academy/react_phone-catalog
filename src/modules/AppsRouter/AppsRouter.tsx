import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from '../../App';
import { HomePage } from '../HomePage';
import { Favourites } from '../Favourites';
import { Cart } from '../Cart';
import { ProductsPage } from '../ProductsPage';
import { ProductDetail } from '../ProductDetail';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';

export const AppRouter = () => {
  const categories = [
    { path: 'phones', header: 'Mobile Phones' },
    { path: 'tablets', header: 'Tablets' },
    { path: 'accessories', header: 'Accessories' },
  ];

  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="favourites" element={<Favourites />} />
          <Route path="cart" element={<Cart />} />

          {categories.map(item => (
            <Route key={item.path} path={item.path}>
              <Route
                index
                element={<ProductsPage header={item.header} path={item.path} />}
              />
              <Route path=":productId" element={<ProductDetail />} />
            </Route>
          ))}

          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
