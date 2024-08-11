import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { FavouritesProvider } from './contexts/favouritesContext';
import { CartProvider } from './contexts/CartContext';
import { ValidateCategory } from './helpers/validateCategory';
import { Catalog } from './pages/Catalog';
import { NotFoundPage } from './components/NotFoundPage';
import { ProductPage } from './pages/ProductPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { CartPage } from './pages/CartPage';

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <FavouritesProvider>
              <CartProvider>
                <App />
              </CartProvider>
            </FavouritesProvider>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" />} />
          <Route path=":category">
            <Route
              index
              element={
                <ValidateCategory>
                  <Catalog />
                </ValidateCategory>
              }
            />
            <Route path=":productID" element={<ProductPage />} />
          </Route>

          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="cart" element={<CartPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
