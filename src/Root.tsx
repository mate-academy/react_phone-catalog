import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CatalogPage } from './pages/CatalogPage';
import { FavouriteProvider } from './context/FavouriteProvider';
import { FavouritesPage } from './pages/FavouritesPage';
import { CartProvider } from './context/CartProvider';
import { CartPage } from './pages/CartPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';

export const Root = () => {
  return (
    <CartProvider>
      <FavouriteProvider>
        <Router>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
              <Route path="home" element={<Navigate to="/" replace />} />

              <Route path="phones">
                <Route
                  index
                  element={
                    <CatalogPage title="Mobile phones" category="phones" />
                  }
                />
                <Route path=":productId" element={<ProductDetailsPage />} />
              </Route>

              <Route path="tablets">
                <Route
                  index
                  element={<CatalogPage title="Tablets" category="tablets" />}
                />
                <Route path=":productId" element={<ProductDetailsPage />} />
              </Route>

              <Route path="accessories">
                <Route
                  index
                  element={
                    <CatalogPage title="Accessories" category="accessories" />
                  }
                />
                <Route path=":productId" element={<ProductDetailsPage />} />
              </Route>

              <Route path="favorites" element={<FavouritesPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Router>
      </FavouriteProvider>
    </CartProvider>
  );
};
