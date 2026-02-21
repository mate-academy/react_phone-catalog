import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Product } from '../types/Product';

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'phone-catalog-cart';

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Product[]>(() => {
    // Initialize from localStorage
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);

      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  // Sync to localStorage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      // Ignore errors
    }
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      // Prevent duplicates (normalize id to string to handle numeric ids from products.json)
      if (prev.some(p => String(p.id) === String(product.id))) {
        return prev;
      }

      return [...prev, { ...product, id: String(product.id) }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(p => String(p.id) !== String(productId)));
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (productId: string) => {
    return cart.some(p => String(p.id) === String(productId));
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, isInCart }}
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
