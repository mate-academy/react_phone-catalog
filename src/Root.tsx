import {
  HashRouter, Routes, Route, Navigate,
} from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { HomePage } from './pages/HomePage';
import { App } from './App';
import { Category } from './pages/Category';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />

          <Route path=":category">
            <Route index element={(<Category />)} />
            <Route path="CartPage">
              <Route index element={(<CartPage />)} />
            </Route>

            <Route path="product/:productId">
              <Route index element={(<ProductDetailsPage />)} />
              <Route path="CartPage">
                <Route index element={(<CartPage />)} />
              </Route>
            </Route>
          </Route>

          <Route path="CartPage">
            <Route index element={(<CartPage />)} />
          </Route>

          <Route
            path="*"
            element={<h1 className="title">Page not found</h1>}
          />
        </Route>
      </Routes>
    </HashRouter>
  );
};
