import '@fortawesome/fontawesome-free/css/all.min.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { HomePage } from './modules/HomePage/HomePage';
import { PhonesPage } from './modules/PhonesPage/PhonesPage';
import { TabletsPage } from './modules/TabletsPage/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage/AccessoriesPage';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';
import { FavoritesPage } from './modules/FavoritesPage/FavoritesPage';
import { CartPage } from './modules/CartPage/CartPage';
import { useEffect, useState } from 'react';
import { Footer } from './components/Footer/Footer';
// eslint-disable-next-line max-len
import { ProductDetailsPage } from './modules/ProductDetailsPage/ProductDetailsPage';

export const App = () => {
  const [cart, setCart] = useState<number[]>(() => {
    const saved = localStorage.getItem('cart');

    return saved ? JSON.parse(saved) : [];
  });

  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('favorites');

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleCart = (productId: number) => {
    setCart(prevCart =>
      prevCart.includes(productId)
        ? prevCart.filter(id => id !== productId)
        : [...prevCart, productId],
    );
  };

  const toggleFavorites = (productId: number) => {
    setFavorites(prevFavorites =>
      prevFavorites.includes(productId)
        ? prevFavorites.filter(id => id !== productId)
        : [...prevFavorites, productId],
    );
  };

  return (
    <HashRouter>
      <Header cartCount={cart.length} favoritesCount={favorites.length} />

      <Routes>
        <Route
          index
          element={
            <HomePage
              cart={cart}
              toggleCart={toggleCart}
              favorites={favorites}
              toggleFavorites={toggleFavorites}
            />
          }
        />
        <Route
          path="/phones"
          element={
            <PhonesPage
              cart={cart}
              favorites={favorites}
              toggleCart={toggleCart}
              toggleFavorites={toggleFavorites}
            />
          }
        />
        <Route
          path="/tablets"
          element={
            <TabletsPage
              cart={cart}
              favorites={favorites}
              toggleCart={toggleCart}
              toggleFavorites={toggleFavorites}
            />
          }
        />
        <Route
          path="/accessories"
          element={
            <AccessoriesPage
              cart={cart}
              toggleCart={toggleCart}
              favorites={favorites}
              toggleFavorites={toggleFavorites}
            />
          }
        />
        <Route
          path="/product/:productId"
          element={
            <ProductDetailsPage
            // cart={cart}
            // favorites={favorites}
            // toggleCart={toggleCart}
            // toggleFavorites={toggleFavorites}
            />
          }
        />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/cart" element={<CartPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </HashRouter>
  );
};
