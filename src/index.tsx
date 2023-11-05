import ReactDOM from 'react-dom';
import {
  HashRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';

import { Provider } from 'react-redux';
import { App } from './App';
import { HomePage } from './pages/HomePage/HomePage';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { TabletsPage } from './pages/TabletsPage/TabletsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AccessoriesPage } from './pages/AccessoriesPage/AccessoriesPage';
import { CartPage } from './pages/CartPage/CartPage';
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage';
import { ProductsProvider } from './components/ProductsContext';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import store from './app/store';

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <ProductsProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />

            <Route path="/phones">
              <Route index element={<PhonesPage />} />
              <Route path=":productId" element={<ProductDetailsPage />} />
            </Route>

            <Route path="/tablets">
              <Route index element={<TabletsPage />} />
              <Route path=":productId" element={<ProductDetailsPage />} />
            </Route>

            <Route path="/accessories">
              <Route index element={<AccessoriesPage />} />
              <Route path=":productId" element={<ProductDetailsPage />} />
            </Route>

            <Route path="/favorites">
              <Route index element={<FavoritesPage />} />
              <Route path=":productId" element={<ProductDetailsPage />} />
            </Route>

            <Route path="/cart">
              <Route index element={<CartPage />} />
              <Route path=":productId" element={<ProductDetailsPage />} />
            </Route>

            <Route path="/home" element={<Navigate to="/" replace />} />

            <Route path="*" index element={<NotFoundPage />} />
          </Route>
        </Routes>
      </ProductsProvider>
    </Provider>
  </Router>,

  document.getElementById('root'),
);
