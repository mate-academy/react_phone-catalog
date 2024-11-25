import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage';
import { ContextProvider } from './ContextProvider';
import { ProductsPage } from './modules/ProductsPage';
import { ProductPage } from './modules/ProductPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { CartPage } from './modules/CartPage';
import { PageNotFound } from './modules/PageNotFound';

export const Root = () => (
  <ContextProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" />} />
          <Route path="phones" element={<ProductsPage />}>
            <Route path=":productId" element={<ProductPage />} />
          </Route>
          <Route path="tablets" element={<ProductsPage />}>
            <Route path=":productId" element={<ProductPage />} />
          </Route>
          <Route path="accessories" element={<ProductsPage />}>
            <Route path=":productId" element={<ProductPage />} />
          </Route>
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  </ContextProvider>
);
