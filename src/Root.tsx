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

export const Root = () => (
  <ProductsProvider>
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path={Category.Phones} element={<PhonesPage />} />
            <Route path={Category.Tablets} element={<TabletsPage />} />
            <Route path={Category.Accessories} element={<AccessoriesPage />} />
            {/* eslint-disable-next-line max-len */}
            <Route path=":category/:productId" element={<ProductDetailsPage />} />
            <Route path="cart" element={<CartPage />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  </ProductsProvider>
);
