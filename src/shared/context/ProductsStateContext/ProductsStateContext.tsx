import React, { createContext, useContext, useEffect, useState } from 'react';
import { Cart } from '../../../types/Cart';

interface ProductsState {
  favorites: number[];
  cart: Cart;
  toggleCartItem: (productId: number) => void;
  toggleFavoriteItem: (productId: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

export const ProductsStateContext = createContext<ProductsState | null>(null);

export const ProductsStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<Cart>({});

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('favorites') || '[]'));
    setCart(JSON.parse(localStorage.getItem('cart') || '{}'));
  }, []);

  const toggleCartItem = (productId: number) => {
    const updated = { ...cart };

    if (updated[productId]) {
      delete updated[productId];
    } else {
      updated[productId] = 1;
    }

    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const toggleFavoriteItem = (productId: number) => {
    const updated = favorites.includes(productId)
      ? favorites.filter(id => id !== productId)
      : [...favorites, productId];

    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    const updated = { ...cart };

    if (quantity > 0) {
      updated[productId] = quantity;
    }

    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const clearCart = () => {
    setCart({});
    localStorage.setItem('cart', '{}');
  };

  return (
    <ProductsStateContext.Provider
      value={{
        favorites,
        cart,
        toggleCartItem,
        toggleFavoriteItem,
        updateCartQuantity,
        clearCart,
      }}
    >
      {children}
    </ProductsStateContext.Provider>
  );
};

export const useProductsState = (): ProductsState => {
  const context = useContext(ProductsStateContext);

  if (!context) {
    throw new Error(
      'useProductsState must be used within ProductsStateProvider',
    );
  }

  return context;
};
