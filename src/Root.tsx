import { HomePage } from './modules/HomePage';
import { App } from './App';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { ProductPage } from './modules/ProductPage';
import { CategoryProvider } from './context/CategoryContext';
import { FavoritesPage } from './modules/FavoritesPage';
import { FavoritesProvider } from './context/FavoritesContext';
import { CartProvider } from './context/CartContext';
import { CartPage } from './modules/CartPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { NotFoundPage } from './modules/NotFoundPage';

export const Root = () => {
  return (
    <Router>
      <CartProvider>
        <FavoritesProvider>
          <CategoryProvider>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<HomePage />} />
                <Route path="phones" element={<ProductPage />} />
                <Route
                  path="phones/:productId"
                  element={<ProductDetailsPage />}
                />
                <Route path="tablets" element={<ProductPage />} />
                <Route
                  path="tablets/:productId"
                  element={<ProductDetailsPage />}
                />
                <Route path="accessories" element={<ProductPage />} />
                <Route
                  path="accessories/:productId"
                  element={<ProductDetailsPage />}
                />
                <Route path="favorites" element={<FavoritesPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </CategoryProvider>
        </FavoritesProvider>
      </CartProvider>
    </Router>
  );
};
