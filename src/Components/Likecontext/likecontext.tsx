// LikeContext.js
import React, { createContext, useContext, useState } from 'react';

const LikeContext = createContext();

export const LikeProvider = ({ children }) => {
  const [likedProducts, setLikedProducts] = useState([]);
  const [likedCount, setLikedCount] = useState(0);

  const toggleLike = (productId) => {
    if (likedProducts.includes(productId)) {
      setLikedProducts(likedProducts.filter((id) => id !== productId));
      setLikedCount((count) => count - 1);
    } else {
      setLikedProducts([...likedProducts, productId]);
      setLikedCount((count) => count + 1);
    }
  };

  return (
    <LikeContext.Provider value={{ likedProducts, likedCount, toggleLike }}>
      {children}
    </LikeContext.Provider>
  );
};

export const useLike = () => {
  return useContext(LikeContext);
};
