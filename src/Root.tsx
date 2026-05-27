import { HashRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage/HomePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { ProductsPage } from './pages/ProductsPage/ProductsPage';
// eslint-disable-next-line max-len
import { ProductDetailsPage } from './pages/ProductDetailsPage/ProductDetailsPage';
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage';
import { FavoritesProvider } from './context/FavoritesContext';
import { CartPage } from './pages/CartPage/CartPage';
import { CartProvider } from './context/CartContext';

export const Root = () => {
  return (
    <HashRouter>
      <FavoritesProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
              <Route
                path="/phones"
                element={<ProductsPage category="phones" />}
              />
              <Route
                path="/tablets"
                element={<ProductsPage category="tablets" />}
              />
              <Route
                path="/accessories"
                element={<ProductsPage category="accessories" />}
              />
              <Route
                path="/product/:productId"
                element={<ProductDetailsPage />}
              />
              <Route path="/favorites" element={<FavoritesPage />} />

              <Route path="/cart" element={<CartPage />} />

              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </CartProvider>
      </FavoritesProvider>
    </HashRouter>
  );
};
