import './App.scss';
import './styles/dark.scss';
import './styles/light.scss';
import './n18';
import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Favourites } from './components/Pages/Favourites/Favourites';
import { Cart } from './components/Pages/Cart/Cart';
import { NotPage } from './components/Pages/NotPage/NotPage';
import classNames from 'classnames';
import { Home } from './components/Pages/Home/Home';
import { Footer } from './components/Footer/Footer';
import { CartProvider } from './components/Context/CartContext';
import { FavouriteProvider } from './components/Context/FavouritesContext';
import { OneDevicesPage } from './components/Pages/OneDevicesPage';
import { Phones } from './components/Pages/Phones/Phones';
import { Accessories } from './components/Pages/Accessories/Accessories';
import { Tablets } from './components/Pages/Tablets/Tablets';

export const App = () => {
  const [isOverflow, setIsOverflow] = useState(false);

  const appClass = classNames('app', {
    'app--no-active': isOverflow,
  });

  useEffect(() => {
    if (isOverflow) {
      document.body.classList.add('app--no-active');
    } else {
      document.body.classList.remove('app--no-active');
    }
  }, [isOverflow]);

  return (
    <div className={appClass}>
      <FavouriteProvider>
        <CartProvider>
          <Navbar setIsOverflow={setIsOverflow} isOverflow={isOverflow} />
          <main className="section">
            <div className="main-container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Navigate to="/" />} />
                <Route path="phones" element={<Phones />} />
                <Route path="tablets" element={<Tablets />} />
                <Route path="accessories" element={<Accessories />} />
                <Route path="/:category/:id" element={<OneDevicesPage />} />
                <Route path="favourites" element={<Favourites />} />
                <Route path="cart" element={<Cart />} />
                <Route path="*" element={<NotPage />} />
              </Routes>
            </div>
          </main>
          <div className="footer__conteiner">
            <Footer />
          </div>
        </CartProvider>
      </FavouriteProvider>
    </div>
  );
};
