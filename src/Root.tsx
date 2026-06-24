import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage';
import { ProductsPage } from './modules/ProductsPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { ProductsProvider } from './store/ProductsContext';
import { ShoppingCartPage } from './modules/ShoppingCartPage/ShoppingCartPage';
import { CartProvider } from './store/CartProvider';
import { FavoritesPage } from './modules/FavoritesPage';
import { FavouritesProvider } from './store/FavouritesProvider';
import { ThemeProvider } from './store/ThemeContext';

export const Root = () => (
  <Router>
    <ThemeProvider>
      <CartProvider>
        <ProductsProvider>
          <FavouritesProvider>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<HomePage />} />
                <Route path=":category">
                  <Route index element={<ProductsPage />} />
                  <Route path=":itemId" element={<ProductDetailsPage />} />
                </Route>
                <Route path="/cart" element={<ShoppingCartPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </FavouritesProvider>
        </ProductsProvider>
      </CartProvider>
    </ThemeProvider>
  </Router>
);
