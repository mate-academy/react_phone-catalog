import ReactDOM from 'react-dom';
import {
  HashRouter, Navigate, Route, Routes,
} from 'react-router-dom';

import App from './App';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/PhonesPage';
import { TestPage } from './pages/TestPage';
import { ProductType } from './types/product';

ReactDOM.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />

        <Route
          path="phones"
          element={<ProductPage productType={ProductType.PHONES} />}
        />

        <Route
          path="tablets"
          element={<ProductPage productType={ProductType.TABLET} />}
        />

        <Route
          path="accessories"
          element={<ProductPage productType={ProductType.ACCESSORY} />}
        />

        <Route path="/dev" element={<TestPage />} />
      </Route>
    </Routes>
  </HashRouter>,
  document.getElementById('root'),
);
