import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { Category } from './types/Category';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { CartProvider } from './contexts/CartContext';
import { ProductsProvider } from './contexts/ProductsContext';
import { FavouritesProvider } from './contexts/FavouritesContext';
import { FavoritesPage } from './pages/FavoritesPage';

export const Root = () => (
  <ProductsProvider>
    <FavouritesProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
              <Route path={Category.Phones} element={<PhonesPage />} />
              <Route path={Category.Tablets} element={<TabletsPage />} />
              {/* eslint-disable-next-line max-len */}
              <Route path={Category.Accessories} element={<AccessoriesPage />} />
              {/* eslint-disable-next-line max-len */}
              <Route path=":category/:productId" element={<ProductDetailsPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="favourites" element={<FavoritesPage />} />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </FavouritesProvider>
  </ProductsProvider>
);
