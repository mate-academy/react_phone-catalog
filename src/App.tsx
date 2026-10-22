import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './shared/context/CartContext';
import { FavoritesProvider } from './shared/context/FavoritesContext';
import { ThemeProvider } from './shared/context/ThemeContext';
import { LanguageProvider } from './shared/context/LanguageContext';

import { Layout } from './components/Layout';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';

import { HomePage } from './modules/HomePage/HomePage';
import { CatalogPage } from './modules/CatalogPage/CatalogPage';
import { FavoritesPage } from './modules/FavoritesPage/FavoritesPage';
import { CartPage } from './modules/CartPage/CartPage';
import { ItemPage } from './modules/ItemPage/ItemPage';
import { ProductsProvider } from './shared/context/ProductsContext';

export const App = () => (
  <div className="App">
    <ThemeProvider>
      <LanguageProvider>
        <ProductsProvider>
          <FavoritesProvider>
            <CartProvider>
              <Routes>
                <Route element={<Layout />}>
                  <Route index element={<HomePage />} />

                  <Route
                    path="/phones"
                    element={<CatalogPage type="phones" />}
                  />
                  <Route
                    path="/tablets"
                    element={<CatalogPage type="tablets" />}
                  />
                  <Route
                    path="/accessories"
                    element={<CatalogPage type="accessories" />}
                  />

                  <Route path="/item/:itemId" element={<ItemPage />} />

                  <Route path="/favorites" element={<FavoritesPage />} />
                  <Route path="/cart" element={<CartPage />} />

                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </CartProvider>
          </FavoritesProvider>
        </ProductsProvider>
      </LanguageProvider>
    </ThemeProvider>
  </div>
);
