import React, { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartContext } from './context/CartContext';
import { FavoritesContext } from './context/FavoritesContext';

export const App: React.FC = () => {
  const { cartItems, updateCartItems } = useContext(CartContext);
  const { favoriteItems, updateFavoriteItems } = useContext(FavoritesContext);

  useEffect(() => {
    const cartItemsInStorage = localStorage.getItem('cartItems');
    if (cartItemsInStorage) {
      updateCartItems(JSON.parse(cartItemsInStorage));
    }

    const favoriteItemsInStorage = localStorage.getItem('favoriteItems');
    if (favoriteItemsInStorage) {
      updateFavoriteItems(JSON.parse(favoriteItemsInStorage));
    }
  }, []);

  useEffect(() => {
    if (cartItems) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  useEffect(() => {
    if (favoriteItems.length > 0) {
      localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
    } else {
      localStorage.removeItem('favoriteItems');
    }
  }, [favoriteItems]);

  return (
    <div className="App">
      <Header />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
