import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './components/pages/HomePage';
import { Menu } from './components/Menu';
import { Phones } from './components/pages/Phones';
import { Tablets } from './components/pages/Tablets';
import { Accessories } from './components/pages/Accessories';
import { ProductDetails } from './components/ProductDetails';
import { Favorites } from './components/Favorites';
import { FavoritesProvider } from './components/Favorites/FavoritesContext';
import { Cart } from './components/CarT';
import { CartProvider } from './components/CarT/CartContext';
import { NotFoundPage } from './components/NotFoundPage';

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
