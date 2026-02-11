/* eslint-disable prettier/prettier */
import React, { createContext } from 'react';
import { ProductForCard } from '../../types/Product/Product';
/* eslint-disable max-len */
import { CartFavoritesContextType } from '../../types/contexts/CartFavoritesContextType';
import { useLocalStorage } from '../hooks/useLocalStorage';

// eslint-disable-next-line prettier/prettier
const CartFavoritesContext = createContext<CartFavoritesContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useLocalStorage<ProductForCard[]>('cart', []);
  const [favorites, setFavorites] = useLocalStorage<ProductForCard[]>(
    'favorites',
    [],
  );

  const addToCart = (product: ProductForCard) => {
    setCart(prev => {
      if (prev.find(item => item.id === product.id)) {
        return prev;
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prev =>
        prev.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item,
        ),
      );
    }
  };

  const addToFavorites = (product: ProductForCard) => {
    setFavorites(prev => {
      if (prev.find(item => item.id === product.id)) {
        return prev;
      }

      return [...prev, product];
    });
  };

  const removeFromFavorites = (productId: number) => {
    setFavorites(prev => prev.filter(item => item.id !== productId));
  };

  const isInCart = (productId: number) => {
    return cart.some(item => item.id === productId);
  };

  const isInFavorites = (productId: number) => {
    return favorites.some(item => item.id === productId);
  };

  const value = {
    cart,
    favorites,
    addToCart,
    addToFavorites,
    removeFromCart,
    removeFromFavorites,
    updateCartQuantity,
    isInCart,
    isInFavorites,
  };

  return (
    <CartFavoritesContext.Provider value={value}>
      {children}
    </CartFavoritesContext.Provider>
  );
};

export { CartFavoritesContext };
