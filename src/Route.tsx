import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './Pages/HomePage/HomePage';
import { NotFoundPage } from './Pages/NotFoundPage/NotFoundPage';
import { ProductPage } from './Pages/ProductPage/ProductPage';
import ProductList from './components/ProductList/ProductList';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="/products" element={<ProductPage />}>
          <Route path=":currentCategory" element={<ProductList />}></Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="home" element={<Navigate to="/" replace />} />
    </Routes>
  </Router>
);
