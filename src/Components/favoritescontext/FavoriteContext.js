// FavoriteProvider.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoriteContext = createContext();

export const useFavoriteContext = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error('useFavoriteContext must be used within a FavoriteProvider');
  }
  return context;
};

export const FavoriteProvider = ({ children }) => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavoriteProducts(storedFavorites);
  }, []);

  const handleLikeClick = (productId) => {
    const updatedFavorites = favoriteProducts.includes(productId)
      ? favoriteProducts.filter((id) => id !== productId)
      : [...favoriteProducts, productId];

    setFavoriteProducts(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <FavoriteContext.Provider value={{ favoriteProducts, handleLikeClick, setFavoriteProducts }}>
      {children}
    </FavoriteContext.Provider>
  );
};
