import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { Menu } from './components/Menu';
import { Phones } from './pages/Phones';
import { Tablets } from './pages/Tablets';
import { Accessories } from './pages/Accessories';
import { ProductDetails } from './components/ProductDetails';
import { Favorites } from './components/Favorites';
import { FavoritesProvider } from './components/Favorites/FavoritesContext';
import { Cart } from './components/Cart';
import { CartProvider } from './components/Cart/CartContext';
import { NotFoundPage } from './pages/NotFoundPage';

export const Root = () => (
  <Router>
    <FavoritesProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<HomePage />}>
              <Route index path="/menu" element={<Menu />} />
            </Route>

            <Route path="/phones" element={<Phones />} />
            <Route path="/tablets" element={<Tablets />} />
            <Route path="/accessories" element={<Accessories />} />
            <Route path="/:category/:productId" element={<ProductDetails />} />

            <Route path="/favorites" element={<Favorites />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </CartProvider>
    </FavoritesProvider>
  </Router>
);
