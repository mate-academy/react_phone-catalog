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

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="phones">
          <Route index element={<ProductsPage type={'phones'} />} />
          <Route path=":phoneId" element={<DetailProductPage />} />
        </Route>
        <Route path="tablets" element={<ProductsPage type={'tablets'} />}>
          <Route path=":phoneId" element={<DetailProductPage />} />
        </Route>
        <Route
          path="accessories"
          element={<ProductsPage type={'accessories'} />}
        >
          <Route path=":phoneId" element={<DetailProductPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
