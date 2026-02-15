import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../types/Product';
import {
  normalizeToCartProduct,
  ProductForCart,
} from '../utils/normalizeToCartProduct';
import { ProductDetails } from '../types/ProductsDetails';

type CartItem = {
  product: ProductForCart;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  totalQty: number;
  totalPrice: number;
  addToCart: (product: Product | ProductDetails) => void;
  removeFromCart: (id: string) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  clear: () => void;
  isInCart: (id: string) => boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const loadCart = (): CartItem[] => {
  try {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  } catch {
    return [];
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>(loadCart);

  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0,
  );

  const addToCart = (value: Product | ProductDetails) => {
    const product: ProductForCart = normalizeToCartProduct(value);

    setCart(prev =>
      prev.some(i => i.product.id === product.id)
        ? prev
        : [...prev, { product, quantity: 1 } as CartItem],
    );
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.product.id !== id));
  };

  const inc = (id: string) => {
    setCart(prev =>
      prev.map(i =>
        i.product.id === id ? { ...i, quantity: i.quantity + 1 } : i,
      ),
    );
  };

  const dec = (id: string) => {
    setCart(prev =>
      prev.map(i =>
        i.product.id === id && i.quantity > 1
          ? { ...i, quantity: i.quantity - 1 }
          : i,
      ),
    );
  };

  const clear = () => setCart([]);

  const isInCart = (id: string) => cart.some(item => item.product.id === id);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        totalQty,
        totalPrice,
        addToCart,
        removeFromCart,
        inc,
        dec,
        clear,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return ctx;
};
