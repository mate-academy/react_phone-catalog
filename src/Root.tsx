import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import HomePage from './modules/HomePage/HomePage';
import NotFoundPage from './modules/NotFoundPage/NotFoundPage';
import { TypeProduct } from './types/category';
import ProductPages from './modules/ProductPages/ProductPages';
// eslint-disable-next-line max-len
import ProductDetailsPage from './modules/ProductDetailsPage/ProductDetailsPage';

export const Root = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route
              path="/phones"
              element={<ProductPages category={TypeProduct.phones} />}
            />
            <Route
              path="/tablets"
              element={<ProductPages category={TypeProduct.tablets} />}
            />
            <Route
              path="/accessories"
              element={<ProductPages category={TypeProduct.accessories} />}
            />
            <Route path="/phones/:productId" element={<ProductDetailsPage />} />
            <Route
              path="/tablets/:productId"
              element={<ProductDetailsPage />}
            />
            <Route
              path="/accessories/:productId"
              element={<ProductDetailsPage />}
            />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="/home" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </Provider>
  );
};
