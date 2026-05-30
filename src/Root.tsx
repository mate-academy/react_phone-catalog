import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { CartPage } from './components/BoughtCard';
import { FavPage } from './components/Favourites';
import { HomePage } from './components/HomePage';
import { ProductPage } from './components/ProductPage';
import { ProductInfo } from './components/ProductInfo';
import { FavouritesProvider } from './components/Favourites/FavouritesContext';
import { CartProvider } from './components/BoughtCard/CartContext';
import { PageNotFound } from './components/PageNotFound';

export const Root = () => {
  return (
    <FavouritesProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
              <Route path="home" element={<Navigate to="/" replace />} />
              <Route path="phones" element={<ProductPage />} />
              <Route path="tablets" element={<ProductPage />} />
              <Route path="accessories" element={<ProductPage />} />
              <Route path=":category">
                <Route index element={<ProductPage />} />
                <Route path=":productId" element={<ProductInfo />} />
              </Route>
              <Route path="favourites" element={<FavPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </FavouritesProvider>
  );
};
