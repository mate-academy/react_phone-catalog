/* eslint-disable prettier/prettier */
/* eslint-disable max-len */

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { FavouritesProvider } from './modules/shared/utils/context/FavouritesContext';
import { ProductsProvider } from './modules/shared/utils/context/ProductsContext';
import { CartProvider } from './modules/shared/utils/context/CartContext';

import { App } from './App';
import { HomePage } from './modules/components/HomePage';
import { FavouritesPage } from './modules/components/FavouritesPage';
import { CartPage } from './modules/components/CartPage';
import { ProductsPage } from './modules/components/ProductsPage';
import { ProductDetailsPage } from './modules/components/ProductCardDetails';
import { NotFoundPage } from './modules/components/NotFoundPage';

export const Root = () => (
  <ProductsProvider>
    <FavouritesProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />

              <Route path="favourites" element={<FavouritesPage />} />
              <Route path="cart" element={<CartPage />} />

              <Route path="phones" element={<ProductsPage />} />
              <Route path="tablets" element={<ProductsPage />} />
              <Route path="accessories" element={<ProductsPage />} />

              <Route path="phones/:productId" element={<ProductDetailsPage />} />
              <Route path="tablets/:productId" element={<ProductDetailsPage />} />
              <Route path="accessories/:productId" element={<ProductDetailsPage />} />

              <Route path="home" element={<Navigate to="/" replace />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </FavouritesProvider>
  </ProductsProvider>

);
