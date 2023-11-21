import {
  Route, createRoutesFromElements, createHashRouter, RouterProvider,
} from 'react-router-dom';
import App from './App';
import { CartProvider } from './context/CartContext';
import { FavouritesProvider } from './context/FavouritesContext';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { CartPage } from './pages/CartPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PhonesPage } from './pages/PhonesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { TabletsPage } from './pages/TabletsPage';

const router = createHashRouter(
  createRoutesFromElements(
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
      <Route path="cart" element={<CartPage />} />
      <Route path="favorites" element={<FavouritesPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ),
);

export const Root = () => (
  <CartProvider>
    <FavouritesProvider>
      <RouterProvider router={router} />
    </FavouritesProvider>
  </CartProvider>
);
