import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';

import { App } from './App';
/* eslint-disable max-len */
import { HomePage } from './modules/HomePage/components/HomePage/HomePage';
import { ProductsProvider } from './modules/shared/_store/ProductsProvider';
import { ProductsPage } from './modules/ProductsPage/components/ProductsPage';
import { Category } from './_types/products';
import { ProductDetailsPage } from './modules/ProductDetailsPage/components/ProductDetailsPage';
import { FavoritesProvider } from './modules/shared/_store/FavoritesProvider';
import { FavoritesPage } from './modules/FavoritesPage/components/FavoritesPage';
import { CartProvider } from './modules/shared/_store/CartProvider';
import { CartPage } from './modules/CartPage/components/CartPage';
import { ThemeProvider } from './modules/shared/_store/ThemeProvider';
/* eslint-disable max-len */
export const Root = () => {
  const categories = Object.values(Category);

  return (
    <Router>
      <ThemeProvider>
        <ProductsProvider>
          <FavoritesProvider>
            <CartProvider>
              <Routes>
                <Route path="/" element={<App />}>
                  <Route path="home" element={<Navigate to="/" />} />
                  <Route index element={<HomePage />} />
                  {categories.map(category => (
                    <Route key={category} path={`${category}`}>
                      <Route
                        index
                        element={<ProductsPage category={category} />}
                      />
                      <Route
                        path=":productId"
                        element={<ProductDetailsPage />}
                      />
                    </Route>
                  ))}
                  <Route path="cart" element={<CartPage />} />
                  <Route path="favourites" element={<FavoritesPage />} />
                </Route>
                <Route path="*" element={<p>Page Not Found</p>} />
              </Routes>
            </CartProvider>
          </FavoritesProvider>
        </ProductsProvider>
      </ThemeProvider>
    </Router>
  );
};
