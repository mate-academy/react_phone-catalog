import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import HomePage from './pages/HomePage/HomePage';
import PhonesPage from './pages/PhonesPage/PhonesPage';
import TabletsPage from './pages/TabletsPage/TabletsPage';
import AccessoriesPage from './pages/AccessoriesPage/AccessoriesPage';
import FavouritesPage from './pages/FavouritesPage/FavouritesPage';
import { ProductsProvider } from './context/ProductsContext';
import { FavouritesProvider } from './context/FavouritesContext';
import { CartProvider } from './context/CartContext';
import CartPage from './pages/CartPage/CartPage';

const Root = () => (
  <Router>
    <ProductsProvider>
      <FavouritesProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
              <Route path="home" element={<Navigate to="/" replace />} />
              <Route path="phones" element={<PhonesPage />} />
              <Route path="tablets" element={<TabletsPage />} />
              <Route path="accessories" element={<AccessoriesPage />} />
              <Route path="favourites" element={<FavouritesPage />} />
              <Route path="cart" element={<CartPage />} />
            </Route>
          </Routes>
        </CartProvider>
      </FavouritesProvider>
    </ProductsProvider>
  </Router>
);

export default Root;
