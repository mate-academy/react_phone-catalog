import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartAddRequest, Product, ShortProduct } from '../models';

interface CartContextType {
  cartItems: CartAddRequest[];
  addToCart: (item: CartAddRequest) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getCart: () => any[];
  updateQuantity: (id: string, quantity: number) => void;
  getTotalQuantity: () => number;
}

const CART_KEY = 'cart';

const loadCart = (): CartAddRequest[] => {
  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load cart:', error);
    return [];
  }
};

const saveToCart = (cartItems: CartAddRequest[]): void => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  } catch (error) {
    console.error('Failed to save cart:', error);
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartAddRequest[]>([]);

  useEffect(() => {
    setCartItems(loadCart());
  }, []);

  const getProductId = (product: Product | ShortProduct): string | number => {
    return 'itemId' in product ? product.itemId : product.id;
  };

  const addToCart = (item: CartAddRequest) => {
    const productId = getProductId(item.product);

    const existingIndex = cartItems.findIndex(
      cartItem => getProductId(cartItem.product) === productId,
    );

    let updatedCart;

    if (existingIndex !== -1) {
      updatedCart = [...cartItems];
      updatedCart[existingIndex].quantity += item.quantity;
    } else {
      updatedCart = [...cartItems, item];
    }

    setCartItems(updatedCart);
    saveToCart(updatedCart);
  };

  const getTotalQuantity = (): number => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const updateQuantity = (id: string, quantity: number) => {
    const updatedCart = cartItems.map(item => {
      if (getProductId(item.product) === id) {
        return { ...item, quantity };
      }
      return item;
    });

    setCartItems(updatedCart);
    saveToCart(updatedCart);
  };

  const removeFromCart = (id: string) => {
    const updatedCart = cartItems.filter(item => {
      const product = item.product;

      if (!product) {
        return true;
      }

      if ('itemId' in product) {
        return product.itemId !== id;
      }

      return product.id !== id;
    });

    setCartItems(updatedCart);
    saveToCart(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(CART_KEY);
  };

  const getCart = (): any[] => {
    return loadCart();
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCart,
        updateQuantity,
        getTotalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
