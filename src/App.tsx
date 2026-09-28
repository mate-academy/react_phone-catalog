import { HashRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './modules/shared/context/CartContext';
import { FavoritesProvider } from './modules/shared/context/FavoritesContext';
import { ThemeProvider } from './modules/shared/context/ThemeContext';
import { SearchProvider } from './modules/shared/context/SearchContext';
import { Layout } from './modules/shared/components/Layout';
import { HomePage } from './modules/HomePage';
import { PhonesPage } from './modules/PhonesPage';
import { TabletsPage } from './modules/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { CartPage } from './modules/CartPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { NotFoundPage } from './modules/NotFoundPage';
import './App.scss';

export const App = () => (
  <ThemeProvider>
    <CartProvider>
      <FavoritesProvider>
        <SearchProvider>
          <HashRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="phones" element={<PhonesPage />} />
                <Route path="tablets" element={<TabletsPage />} />
                <Route path="accessories" element={<AccessoriesPage />} />
                <Route
                  path="product/:productId"
                  element={<ProductDetailsPage />}
                />
                <Route path="cart" element={<CartPage />} />
                <Route path="favorites" element={<FavoritesPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </HashRouter>
        </SearchProvider>
      </FavoritesProvider>
    </CartProvider>
  </ThemeProvider>
);
