import { HashRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './modules/HomePage';
import { PhonesPage } from './modules/PhonesPage';
import { App } from './App';
import { NotFoundPage } from './modules/NotFoundPage';
import { TabletsPage } from '@modules/TabletsPage';
import { AccessoriesPage } from '@modules/AccessoriesPage';
import { ProductDetailsPage } from '@modules/ProductDetailsPage';
import { FavouritesPage } from '@modules/FavouritesPage';
import { FavouritesProvider } from '@shared/context/FavouritesContext';
import { CartProvider } from '@shared/context/CartContext';
import { CartPage } from '@modules/CartPage';
import { ThemeProvider } from '@shared/context/ThemeContext';
import { SkeletonProvider } from '@shared/context/SkeletonProvider';

export const Root = () => (
  <HashRouter>
    <ThemeProvider>
      <SkeletonProvider>
        <FavouritesProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<HomePage />} />
                <Route path="phones" element={<PhonesPage />} />
                <Route path="tablets" element={<TabletsPage />} />
                <Route path="accessories" element={<AccessoriesPage />} />
                <Route
                  path="product/:productId"
                  element={<ProductDetailsPage />}
                />
                <Route path="favourites" element={<FavouritesPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </CartProvider>
        </FavouritesProvider>
      </SkeletonProvider>
    </ThemeProvider>
  </HashRouter>
);
