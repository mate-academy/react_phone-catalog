/* eslint-disable max-len */
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import App from '../App';
import { HomePage } from '../pages/HomePage/HomePage';
import { PhonesPage } from '../pages/PhonePage/PhonesPage';
import { ProductProvider } from '../context/ProductContext';
import { TabletsPage } from '../pages/TabletsPage/TabletsPage';
import { AccessoriesPage } from '../pages/AccessoriesPage/AccessoriesPage';
import { ProductDetailPage } from '../pages/ProductDetailPage/ProductDetailPage';
import { CartProvider } from '../context/CartContext';
import { CartPage } from '../pages/CartPage/CartPage';
import { FavouriteProvider } from '../context/FavouriteContext';
import { FavouritePage } from '../pages/FavouritesPage/FavouritesPage';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage';

export const Root = () => (
  <ProductProvider>
    <CartProvider>
      <FavouriteProvider>
        <Router>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
              <Route
                path="home"
                element={<Navigate to="/" replace />}
              />

              <Route path="phones">
                <Route index element={<PhonesPage />} />
                <Route path=":productId" element={<ProductDetailPage />} />
              </Route>

              <Route path="tablets">
                <Route index element={<TabletsPage />} />
                <Route path=":productId" element={<ProductDetailPage />} />
              </Route>

              <Route path="accessories">
                <Route index element={<AccessoriesPage />} />
                <Route path=":productId" element={<ProductDetailPage />} />
              </Route>

              <Route path="cart" element={<CartPage />} />
              <Route path="favourites" element={<FavouritePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Router>
      </FavouriteProvider>
    </CartProvider>
  </ProductProvider>
);
