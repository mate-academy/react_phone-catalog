import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import App from './App';
import { FavouritesProvider } from './contexts/favoritesContext';
import { NotificationProvider } from './contexts/notificationContext';
import { HomePage } from './pages/HomePage/HomePage';
import { PhonesPage } from './pages/Phones/PhonesPage';
import { TabletsPage } from './pages/Tablets/TabletsPage';
import { AccessoriesPage } from './pages/Accessories/AccessoriesPage';
// import { CartPage } from './pages/CartPage';
// import { FavoritesPage } from './pages/FavoritesPage';
import { ProductDetailsPage } from
  './pages/ProductDetailsPage/ProductDetailsPage';
// import { CartProvider } from './storage/cartContext';
// import { ModalProvider } from './storage/modalContext';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

export const Root: React.FC = () => (
  <NotificationProvider>
    {/* <ModalProvider> */}
    {/* <CartProvider> */}
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
            </Route>

            <Route path="accessories">
              <Route index element={<AccessoriesPage />} />
            </Route>

            {/* <Route path='favorites' element={<FavoritesPage />} />
            <Route path='cart' element={<CartPage />} /> */}
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </FavouritesProvider>
    {/* </CartProvider> */}
    {/* </ModalProvider> */}
  </NotificationProvider>
);
