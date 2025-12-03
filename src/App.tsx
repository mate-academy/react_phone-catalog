import { Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import './styles/main.scss';
import { Navbar } from './modules/Navbar/Navbar';
import { HomePage } from './modules/Home/HomePage';
import { PhonePage } from './modules/Phone/PhonePage';
import { FavoritePage } from './modules/Favorites/FavoritePage';
import { CartPage } from './modules/Cart/CartPage';
import { TabletPage } from './modules/Tablets/Tablets';
import { AccessoriesPage } from './modules/Accessories/Accessories';
import { FooterPage } from './modules/Footer/footer';
import { FavoriteProvider } from './components/Context/FavoriteContext';
import { CartProvider } from './components/Context/CartContext';
import { ItemPage } from './modules/ItemPage/ItemPage';
// eslint-disable-next-line import/no-extraneous-dependencies
import Lenis from '@studio-freight/lenis';
import { useEffect } from 'react';

export const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="App">
      <CartProvider>
        <FavoriteProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/phones" element={<PhonePage />} />
            <Route path="/tablets" element={<TabletPage />} />
            <Route path="/accessories" element={<AccessoriesPage />} />
            <Route path="/favorites" element={<FavoritePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/:category/:itemId" element={<ItemPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <FooterPage />
        </FavoriteProvider>
      </CartProvider>
    </div>
  );
};
