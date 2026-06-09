import React, { createContext, useState, useContext, useEffect } from 'react';
import { Products } from '../types/Alltypes';

type CartItem = {
  id: string;
  quantity: number;
  product: Products;
};

type CartContextType = {
  cart: CartItem[];
  favorites: string[];
  addToCart: (product: Products) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalQuantity: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvader: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');

    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [favorites, setFavorites] = useState<string[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');

    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToCart = (item: CartItem) => {
    // dodae tovar //
    setCart(prevCart => {
      const existingItem = prevCart.find(
        cartItem =>
          cartItem.id === item.id && cartItem.product === item.product,
      );

      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id && cartItem.product === item.product
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }

      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    //vidalye tovar //
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  // const updateQuantity = (id: string, quantity: number) => {
  //   if (quantity <= 0) {
  //     removeFromCart(id);

  //     return;
  //   }

  //   setCart(prevCart =>
  //     prevCart.map(item => (item.id === id ? { ...item, quantity } : item)),
  //   );
  // };

  // const toggleFavorite = (id: string) => {
  //   setFavorites(prevFavorites =>
  //     prevFavorites.includes(id)
  //       ? prevFavorites.filter(favId => favId !== id)
  //       : [...prevFavorites, id],
  //   );
  // };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        favorites,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleFavorite,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
