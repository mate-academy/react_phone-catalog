import React, { createContext, useContext, useEffect, useState } from 'react';
import { DeviceType } from '../../types/DeviceType';
import { ProductType } from '../../types/ProductType';

type CartItem = {
  id: string | number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: ProductType | DeviceType) => void;
  removeFromCart: (id: string | number) => void;
  increaseQuantity: (id: string | number) => void;
  decreaseQuantity: (id: string | number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const storedCart = localStorage.getItem('cart');

      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: ProductType | DeviceType) => {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      image: 'image' in product ? product.image : product.images[0],
      price: 'priceDiscount' in product ? product.priceDiscount : product.price,
      quantity: 1,
    };

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === cartItem.id);

      if (existingItem) {
        return prevCart.map(item =>
          item.id === cartItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prevCart, cartItem];
    });
  };

  const removeFromCart = (id: string | number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const increaseQuantity = (id: string | number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (id: string | number) => {
    setCart(prevCart =>
      prevCart
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter(item => item.quantity > 0),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
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
