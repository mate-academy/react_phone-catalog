import { Route, Routes } from 'react-router-dom';
import { Layout } from '@/modules/shared/components/Layout';
import { NotFoundPage } from '@/modules/NotFoundPage';
import { HomePage } from '@/modules/HomePage';
import { PhonesPage } from '@/modules/PhonesPage';
import { TabletsPage } from '@/modules/TabletsPage';
import { AccessoriesPage } from '@/modules/AccessoriesPage';
import { ProductDetailsPage } from '@/modules/ProductDetailsPage';
import { FavouritesPage } from '@/modules/FavouritesPage';
import { CartPage } from '@/modules/CartPage';
import { CartProvider } from '@/context/CartContext';
import { FavouritesProvider } from '@/context/FavouritesContext';
import '@/styles/styles.scss';

export const App = () => (
  <CartProvider>
    <FavouritesProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="phones" element={<PhonesPage />} />
          <Route path="tablets" element={<TabletsPage />} />
          <Route path="accessories" element={<AccessoriesPage />} />
          <Route path="product/:productId" element={<ProductDetailsPage />} />
          <Route path="favourites" element={<FavouritesPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </FavouritesProvider>
  </CartProvider>
);
