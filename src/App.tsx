import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './modules/HomePage/HomePage';
import PhonesPage from './modules/ProductsPage/components/PhonesPage/PhonesPage';
import TabletsPage from './modules/ProductsPage/components/TabletsPage/TabletsPage';
import AccessoriesPage from './modules/ProductsPage/components/AccessoriesPage/AccessoriesPage';
import AllProductsPage from './modules/ProductsPage/components/AllProductsPage/AllProductsPage';
import ProductDetailsPage from './modules/ProductsPage/components/ProductDetailsPage/ProductDetailsPage';
import FavoritesPage from './modules/FavoritesPage/FavoritesPage';
import { FavoritesProvider } from './modules/FavoritesPage/FavoritesContext';
import CartPage from './modules/CartPage/CartPage';
import { CartProvider } from './modules/CartPage/CartContext';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';



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
            <Route path="/products" element={<AllProductsPage />} />
            <Route path="/product/:productId" element={<ProductDetailsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path= "*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </FavoritesProvider>
  );
};
