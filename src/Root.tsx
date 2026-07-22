import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { CatalogPage } from './modules/CatalogPage';
import { HomePage } from './modules/HomePage';
import { FavoritesPage } from './modules/FavoritesPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { CartPage } from './modules/CartPage';
import { ProductPage } from './modules/ProductPage';
import { ShopProvider } from './context/ShopContext';

export const Root = () => (
  <ShopProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route
            path="phones"
            element={
              <CatalogPage
                category="phones"
                title="Mobile phones"
                breadcrumbLabel="Phones"
              />
            }
          />
          <Route
            path="tablets"
            element={
              <CatalogPage
                category="tablets"
                title="Tablets"
                breadcrumbLabel="Tablets"
              />
            }
          />
          <Route
            path="accessories"
            element={
              <CatalogPage
                category="accessories"
                title="Accessories"
                breadcrumbLabel="Accessories"
              />
            }
          />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="product/:productId" element={<ProductPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  </ShopProvider>
);
