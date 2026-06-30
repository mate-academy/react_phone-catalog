import './App.scss';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { Layout } from './modules/shared/components/Layout';
import { CategoryPage } from './modules/CategoryPage';
import { HomePage } from './modules/HomePage';
import { NotFoundPage } from './modules/NotFoundPage';
import { CartPage } from './modules/CartPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { CartProvider } from './modules/shared/context/CartContext';
import { FavoritesProvider } from './modules/shared/context/FavoritesContext';
import { ScrollToTop } from './utils';
export const App = () => (
  <HashRouter
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}
  >
    <ScrollToTop />
    <CartProvider>
      <FavoritesProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path=":category" element={<CategoryPage />} />
            <Route
              path=":category/:productId"
              element={<ProductDetailsPage />}
            />
            <Route path="cart" element={<CartPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </FavoritesProvider>
    </CartProvider>
  </HashRouter>
);
