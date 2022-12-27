import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { ContextProvider } from './components/Context';
import { CartPage } from './pages/CartPage';
import { CategoryPage } from './pages/CategoryPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';

const Root = () => (
  <Router>
    <ContextProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="*" element={<NotFoundPage />} />

          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />

          <Route path="phones" element={<CategoryPage />} />
          <Route
            path="phones/:productId"
            element={<ProductDetailsPage />}
          />

          <Route path="tablets" element={<CategoryPage />} />
          <Route
            path="tablets/:productId"
            element={<ProductDetailsPage />}
          />

          <Route path="accessories" element={<CategoryPage />} />
          <Route
            path="accessories/:productId"
            element={<ProductDetailsPage />}
          />

          <Route path="favorite" element={<CategoryPage />} />
          <Route path="cart" element={<CartPage />} />
        </Route>
      </Routes>
    </ContextProvider>
  </Router>
);

ReactDOM.render(
  <Root />,
  document.getElementById('root'),
);
