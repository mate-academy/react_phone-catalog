//hooks
import { useEffect, useState } from 'react';

//react-router
import { Navigate, Route, Routes } from 'react-router-dom';

//style
import './styles/Reset.scss';
import styles from './App.module.scss';

//components
import { NavBar } from './components/NavBar';

//pages
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductPage } from './pages/ProductPage';
import { Favourites } from './pages/Favourites';
import { Cart } from './pages/Cart';

//services
import { FavouritesContext } from './services/FavouritesContext';
import { CartContext } from './services/CartContext';
import { Footer } from './components/Footer';

export const App = () => {
  const [cart, setCart] = useState<string[]>([]);
  const [favourites, setFavourites] = useState<string[]>([]);

  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + '#/');
    }
  }, []);

  return (
    <div className={styles.app}>
      <CartContext.Provider value={{ cart, setCart }}>
        <FavouritesContext.Provider value={{ favourites, setFavourites }}>
          <NavBar />

          <div className={styles.content}>
            <Routes>
              <Route
                path="/home"
                element={<Navigate to="/" replace={true} />}
              />
              <Route path="/" element={<HomePage />} />
              <Route
                path="/phones"
                element={<CatalogPage productsType={'phones'} />}
              />
              <Route path="/phones/:productId" element={<ProductPage />} />
              <Route
                path="/tablets"
                element={<CatalogPage productsType={'tablets'} />}
              />
              <Route path="/tablets/:productId" element={<ProductPage />} />
              <Route
                path="/accessories"
                element={<CatalogPage productsType={'accessories'} />}
              />
              <Route path="/accessories/:productId" element={<ProductPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/favourites" element={<Favourites />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>

          <Footer />
        </FavouritesContext.Provider>
      </CartContext.Provider>
    </div>
  );
};
