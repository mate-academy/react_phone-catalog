import React, { createContext, useContext, useEffect, useState } from 'react';
import { ProductType } from '../../types/ProductType';
import { DeviseType } from '../../types/DeviseType';

type CartItem = {
  id: string | number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: ProductType | DeviseType) => void;
  removeFromCart: (id: string | number) => void;
  increaseQuantity: (id: string | number) => void;
  decreaseQuantity: (id: string | number) => void;
  totalCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: ProductType | DeviseType) => {
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
    if (cart.length === 0) {
      return;
    }

    let cartItems = cart?.map(item =>
      item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
    );

    cartItems = cartItems.filter(item => item.quantity > 0);
    setCart(cartItems);
  };

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('cart');
      const nextCart = storedCart ? JSON.parse(storedCart) : [];

      setCart(nextCart);
    } catch (error) {
      setCart([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        totalCount,
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
