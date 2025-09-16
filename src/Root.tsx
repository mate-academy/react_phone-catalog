import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { FavouritesProvider } from './components/Favourites/FavouritesContext';
import { CartProvider } from './components/BoughtCart/CartContext';
import { App } from './App';
import { HomePage } from './components/HomePage';
import { ProductPage } from './components/ProductPage';
import { ProductInfo } from './components/ProductInfo/ProductInfo';
import { FavouritesPage } from './components/Favourites';
import { CartPage } from './components/BoughtCart';
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
              <Route path="favourites" element={<FavouritesPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </FavouritesProvider>
  );
};
