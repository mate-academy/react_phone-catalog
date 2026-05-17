import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './i18n';
import { App } from './App';
import { Phones } from './components/Phones';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { ProductDetailsPage } from './components/ProductDetailsPage';
import { Favorite } from './components/Favorite';
import { Cart } from './components/Card';
import { FavoritesProvider } from './context/FavoritesContext';
import { CartProvider } from './context/CartContext';
import { Main } from './components/Main';
import { Tablets } from './components/Tablets';
import { Accessories } from './components/Accessories';

export const Root = () => (
  <CartProvider>
    <FavoritesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            {/* Головна сторінка */}
            <Route index element={<Main />} />

            {/* Телефони */}
            <Route path="phones">
              <Route index element={<Phones />} />
              <Route path=":productId" element={<ProductDetailsPage />} />
            </Route>

            {/* Планшети */}
            <Route path="tablets">
              <Route index element={<Tablets />} />
              <Route path=":productId" element={<ProductDetailsPage />} />
            </Route>

            {/* Аксесуари */}
            <Route path="accessories">
              <Route index element={<Accessories />} />
              <Route path=":productId" element={<ProductDetailsPage />} />
            </Route>

            {/* Обране та Кошик */}
            <Route path="favorites" element={<Favorite />} />
            <Route path="cart" element={<Cart />} />

            {/* Сторінка 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </FavoritesProvider>
  </CartProvider>
);
