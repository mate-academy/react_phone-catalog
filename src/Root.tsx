import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './components/HomePage';
import { ProductsProvider } from './contexts/products/ProductsStore';
import { CatalogPage } from './components/CatalogPage';
import { ProductDetailsPage } from './components/ProductDetails';
import { PhonesProvider } from './contexts/phones';
import { TabletsProvider } from './contexts/tablets/TabletsStore';
import { AccessoriesProvider } from './contexts/accessories';
import { ScrollToTop } from './components/ScrollTotop';
import { CartPage } from './components/CartPage/CartPage';
import { CartProvider } from './contexts/cart';
import { FavoritesPage } from './components/FavoritesPage';
import { compose } from './utils/compose';
import { FavoritesProvider } from './contexts/favorites';

const Providers = compose([
  CartProvider,
  ProductsProvider,
  PhonesProvider,
  TabletsProvider,
  AccessoriesProvider,
  FavoritesProvider,
]);

export const Root = () => (
  <Router>
    <ScrollToTop />

    <Providers>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />

          <Route path="phones">
            <Route
              index
              element={<CatalogPage category="phones" title="Phones" />}
            />
            <Route
              path=":itemId"
              element={<ProductDetailsPage category="phones" title="Phones" />}
            />
          </Route>
          <Route path="tablets">
            <Route
              index
              element={<CatalogPage category="tablets" title="Tablets" />}
            />
            <Route
              path=":itemId"
              element={
                <ProductDetailsPage category="tablets" title="Tablets" />
              }
            />
          </Route>
          <Route path="accessories">
            <Route
              index
              element={
                <CatalogPage category="accessories" title="Accessories" />
              }
            />
            <Route
              path=":itemId"
              element={
                <ProductDetailsPage
                  category="accessories"
                  title="Accessories"
                />
              }
            />
          </Route>
          <Route path="favorites" element={<FavoritesPage />}></Route>
          <Route path="cart" element={<CartPage />}></Route>
        </Route>
      </Routes>
    </Providers>
  </Router>
);
