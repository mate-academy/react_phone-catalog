import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import { FavouritesProvider } from './contexts/favoritesContext';
import { NotificationProvider } from './contexts/notificationContext';
import { HomePage } from './pages/HomePage/HomePage';
import { PhonesPage } from './pages/Phones/PhonesPage';
import { TabletsPage } from './pages/Tablets/TabletsPage';
import { AccessoriesPage } from './pages/Accessories/AccessoriesPage';
import { CartPage } from './pages/CartPage/CartPage';
import { FavoritesPage } from './pages/Favourites/FavoritesPage';
// eslint-disable-next-line max-len
import { ProductDetailsPage } from './pages/ProductDetailsPage/ProductDetailsPage';
import { CartProvider } from './contexts/cartContext';
import { ModalProvider } from './contexts/modalContext';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

export const Root: React.FC = () => (
  <NotificationProvider>
    <ModalProvider>
      <CartProvider>
        <FavouritesProvider>
          <Router>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<HomePage />} />

                <Route path="phones">
                  <Route index element={<PhonesPage />} />
                  <Route path=":productId" element={<ProductDetailsPage />} />
                </Route>

                <Route path="tablets">
                  <Route index element={<TabletsPage />} />
                  <Route path=":productId" element={<ProductDetailsPage />} />
                </Route>

                <Route path="accessories">
                  <Route index element={<AccessoriesPage />} />
                  <Route path=":productId" element={<ProductDetailsPage />} />
                </Route>

                <Route path="favorites">
                  <Route index element={<FavoritesPage />} />
                  <Route path=":productId" element={<ProductDetailsPage />} />
                </Route>

                <Route path=":productId" element={<ProductDetailsPage />} />
                <Route path="cart" element={<CartPage />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Router>
        </FavouritesProvider>
      </CartProvider>
    </ModalProvider>
  </NotificationProvider>
);
