import { createContext, useContext, useState } from 'react';
import { NormalizedProduct } from '../interfaces/Product';

export type CartItem = {
  product: NormalizedProduct;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: NormalizedProduct) => void;
  isInCart: (id: string) => boolean;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('cart');

      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const isInCart = (id: string) => cart.some(item => item.product.id === id);

  const saveToStorage = (items: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(items));
  };

  const addToCart = (product: NormalizedProduct) => {
    if (isInCart(product.id)) {
      return;
    }

    setCart(prev => {
      const updated = [...prev, { product, quantity: 1 }];

      saveToStorage(updated);

      return updated;
    });
  };

  const increaseQuantity = (id: string) => {
    setCart(prev => {
      const updated = prev.map(item =>
        item.product.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );

      saveToStorage(updated);

      return updated;
    });
  };

  const decreaseQuantity = (id: string) => {
    setCart(prev => {
      const updated = prev.map(item =>
        item.product.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );

      saveToStorage(updated);

      return updated;
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const updated = prev.filter(item => item.product.id !== id);

      saveToStorage(updated);

      return updated;
    });
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        isInCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
};
