import { Route, Routes } from 'react-router-dom';
import './App.scss';

import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import { Home } from './page/Home/Home';
import { FavoritesPage } from './components/Favorites/FavoritesPage';
import { FavoritesProvider } from './FavoriteContext';
import { CartProvider } from './CartContext';
import { CartPage } from './page/CartPage/CartPage';
import { Phones } from './page/Phones/Phones';
import { Tablets } from './page/Tablets/Tablets';
import { Accessories } from './page/Accessories/Accessories';
import { ProductPage } from './page/ProductPage/ProductPage';
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop';

export const App = () => {
  return (
    <CartProvider>
      <FavoritesProvider>
        <div className="app">
          <Header />
          <ScrollToTop />
          <main className="appContent">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/phones" element={<Phones />} />
              <Route path="/tablets" element={<Tablets />} />
              <Route path="/accessories" element={<Accessories />} />
              <Route path="/product/:itemId" element={<ProductPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </FavoritesProvider>
    </CartProvider>
  );
};
