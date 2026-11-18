import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { CartProvider } from '../context/CartProvider';
import { StateProvider } from '../context/StateProvider';

import { App } from '../App';

import { HomePage } from '../modules/HomePage';
import { ProductsPage } from '../modules/ProductsPage';
import { ProductDetailsPage } from '../modules/ProductDetailsPage';
import { NotFoundPage } from '../components/NotFoundPage';
import { CartPage } from '../modules/CartPage';
import { FavoritePage } from '../modules/FavoritePage';
import { FavoriteProvider } from '../context/FavoriteProvider';

export function Root() {
  return (
    <CartProvider>
      <FavoriteProvider>
        <StateProvider>
          <Router>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<HomePage />} />

                <Route path=":category">
                  <Route index element={<ProductsPage />} />
                  <Route path=":productId" element={<ProductDetailsPage />} />
                </Route>

                <Route path="cart" element={<CartPage />} />

                <Route path="favorites" element={<FavoritePage />} />

                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </Router>
        </StateProvider>
      </FavoriteProvider>
    </CartProvider>
  );
}
