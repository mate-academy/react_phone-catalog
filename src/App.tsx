import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './modules/HomePage/HomePage';
// eslint-disable-next-line max-len
import PhonesPage from './modules/ProductsPage/components/PhonesPage/PhonesPage';
// eslint-disable-next-line max-len
import TabletsPage from './modules/ProductsPage/components/TabletsPage/TabletsPage';
// eslint-disable-next-line max-len
import AccessoriesPage from './modules/ProductsPage/components/AccessoriesPage/AccessoriesPage';
// eslint-disable-next-line max-len
import ProductDetailsPage from './modules/ProductsPage/components/ProductDetailsPage/ProductDetailsPage';
import FavoritesPage from './modules/FavoritesPage/FavoritesPage';
import { FavoritesProvider } from './modules/FavoritesPage/FavoritesContext';
import CartPage from './modules/CartPage/CartPage';
import { CartProvider } from './modules/CartPage/CartContext';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';

export const App = () => {
  return (
    <FavoritesProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/phones" element={<PhonesPage />} />
            <Route path="/tablets" element={<TabletsPage />} />
            <Route path="/accessories" element={<AccessoriesPage />} />
            <Route
              path="/product/:productId"
              element={<ProductDetailsPage />}
            />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </FavoritesProvider>
  );
};
