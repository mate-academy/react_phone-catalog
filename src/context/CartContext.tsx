import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../types';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  toggleCart: (product: Product) => void;
  isInCart: (itemId: string) => boolean;
  increaseQuantity: (itemId: string) => void;
  decreaseQuantity: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  totalPrice: number;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  function toggleCart(product: Product) {
    setCart(prev => {
      const alreadyExists = prev.some(
        item => item.product.itemId === product.itemId,
      );

      if (alreadyExists) {
        return prev.filter(item => item.product.itemId !== product.itemId);
      }

      return [...prev, { product, quantity: 1 }];
    });
  }

  function isInCart(itemId: string) {
    return cart.some(item => item.product.itemId === itemId);
  }

  function increaseQuantity(itemId: string) {
    setCart(prev =>
      prev.map(item =>
        item.product.itemId === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  }

  function decreaseQuantity(itemId: string) {
    setCart(prev =>
      prev.map(item =>
        item.product.itemId === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  }

  function removeFromCart(itemId: string) {
    setCart(prev => prev.filter(item => item.product.itemId !== itemId));
  }

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        toggleCart,
        isInCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}
