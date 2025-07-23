import React, { createContext, useState, useEffect } from 'react';
import { useLocalStorageProducts } from '../hooks/useLocalStorage';
import type { Product } from '../types/Product';
import type { CartContextType } from '../types/CartContextType';
import type { CartProviderProps } from '../types/CartProviderProps';
import type { ProductQuantities } from '../types/ProductQuantities';

const CartContext = createContext<CartContextType | undefined>(undefined);

export { CartContext };

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const {
    items: cartItems,
    add: addToCart,
    remove: removeFromCart,
    contains: isInCart,
    clear: clearCart,
  } = useLocalStorageProducts('cart');

  const {
    items: favorites,
    add: addToFavorites,
    remove: removeFromFavorites,
    contains: isInFavorites,
    clear: clearFavorites,
  } = useLocalStorageProducts('favorites');

  const [quantities, setQuantities] = useState<ProductQuantities>({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem('cart-quantities');
      if (stored) {
        setQuantities(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading quantities:', error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart-quantities', JSON.stringify(quantities));
  }, [quantities]);

  const getQuantity = (product: Product): number => {
    return quantities[product.id] || 1;
  };

  const setQuantity = (product: Product, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(product);
      setQuantities((prev: ProductQuantities) => {
        const newQuantities = { ...prev };
        delete newQuantities[product.id];
        return newQuantities;
      });
    } else {
      setQuantities((prev: ProductQuantities) => ({
        ...prev,
        [product.id]: quantity,
      }));
    }
  };

  const increaseQuantity = (product: Product) => {
    const currentQuantity = getQuantity(product);
    setQuantity(product, currentQuantity + 1);
  };

  const decreaseQuantity = (product: Product) => {
    const currentQuantity = getQuantity(product);
    if (currentQuantity > 1) {
      setQuantity(product, currentQuantity - 1);
    }
  };

  const getTotalPrice = (): number => {
    return cartItems.reduce((total, product) => {
      const quantity = getQuantity(product);
      return total + product.price * quantity;
    }, 0);
  };

  const getTotalItems = (): number => {
    return cartItems.reduce((total, product) => {
      return total + getQuantity(product);
    }, 0);
  };

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    isInCart,
    clearCart,
    getQuantity,
    setQuantity,
    increaseQuantity,
    decreaseQuantity,
    getTotalPrice,
    getTotalItems,
    favorites,
    addToFavorites,
    removeFromFavorites,
    isInFavorites,
    clearFavorites,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
