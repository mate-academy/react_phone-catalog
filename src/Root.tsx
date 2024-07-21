import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './Pages/HomePage';
import { FavouritesProvider } from './Contexts/FavouritesContext';
import { CartProvider } from './Contexts/CartContext';
import { NotFoundPage } from './Pages/NotFoundPage';
import { Catalog } from './Pages/Catalog';
import { ValidateCategory } from './helpers/ValidateCategory';
import { ProductPage } from './Pages/ProductPage';
import { FavoritesPage } from './Pages/FavoritesPage';
import { CartPage } from './Pages/CartPage';

export const Root = () => (
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
