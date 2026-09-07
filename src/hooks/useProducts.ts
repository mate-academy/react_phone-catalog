/* eslint-disable import/extensions */
import { CartContext } from '@/context/CartContext';
import { FavoritesContext } from '@/context/FavoritesContext';
import { ProductContext } from '@/context/ProductContext';
import { useContext } from 'react';

export const useProducts = () => {
  const productContext = useContext(ProductContext);
  const cartContext = useContext(CartContext);
  const favoritesContext = useContext(FavoritesContext);

  if (!productContext || !cartContext || !favoritesContext) {
    throw new Error(
      'useProducts must be used within the appropriate providers',
    );
  }

  return {
    products: productContext.products,
    loading: productContext.loading,
    error: productContext.error,

    cart: cartContext.cart,
    setCart: cartContext.setCart,

    favorites: favoritesContext.favorites,
    setFavorites: favoritesContext.setFavorites,
  };
};
