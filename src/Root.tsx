import { HashRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { Main } from './modules/HomePage/components/Main/Main';
import { Phones } from './modules/ProductPages/components/Mobile';
import { Tablets } from './modules/ProductPages/components/Tablets';
import { Accessories } from './modules/ProductPages/components/Accessories';
import { ProductDetails } from './modules/ProductDetails';
import { App } from './App';
import { Cart } from './modules/CartPage';
import { Favourites } from './modules/Favourites';
import { CartProvider } from './CartContext';
import { FavouritesProvider } from './FavouritesContext';
import { NotFoundPage } from './modules/shared/NotFoundPage/NotFoundPage';

export const Root = () => (
  <Router>
    <CartProvider>
      <FavouritesProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Main />} />
            <Route path="phones" element={<Phones />} />
            <Route path="tablets" element={<Tablets />} />
            <Route path="accessories" element={<Accessories />} />
            <Route path="cart" element={<Cart />} />
            <Route path="favourites" element={<Favourites />} />
            <Route path="product/:productId" element={<ProductDetails />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </FavouritesProvider>
    </CartProvider>
  </Router>
);
