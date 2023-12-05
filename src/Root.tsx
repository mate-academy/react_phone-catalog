import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';

import App from './App';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductType } from './types/ProductType';

export const Root = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route
            index
            element={<HomePage />}
          />

          <Route
            path="home"
            element={<Navigate to="/" replace />}
          />

          <Route
            path="phones"
            element={<ProductsPage productType={ProductType.PHONE} />}
          />

          <Route
            path="tablets"
            element={<ProductsPage productType={ProductType.TABLET} />}
          />

          <Route
            path="accessories"
            element={<ProductsPage productType={ProductType.ACCESSORY} />}
          />
        </Route>
      </Routes>
    </Router>
  </Provider>

);
