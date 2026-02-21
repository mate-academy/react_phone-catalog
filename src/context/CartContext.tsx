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
  quantities: Record<string, number>;
  totalQuantity: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'phone-catalog-cart';
const CART_QUANTITIES_KEY = 'phone-catalog-cart-quantities';

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);

      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    try {
      const stored = localStorage.getItem(CART_QUANTITIES_KEY);

      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      return {};
    }
  });

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      // ignore
    }
  }, [cart]);

  // Sync quantities to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_QUANTITIES_KEY, JSON.stringify(quantities));
    } catch (e) {
      // ignore
    }
  }, [quantities]);

  const addToCart = (product: Product) => {
    const canonicalId = String(product.itemId ?? product.id);
    const normalized = { ...product, id: canonicalId };

    setCart(prev => {
      if (prev.some(p => String(p.id) === canonicalId)) {
        return prev;
      }

      return [...prev, normalized];
    });

    setQuantities(prev => ({
      ...prev,
      [canonicalId]: prev[canonicalId] ?? 1,
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(p => String(p.id) !== String(productId)));
    setQuantities(prev => {
      const next = { ...prev };

      delete next[String(productId)];

      return next;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      return;
    }

    setQuantities(prev => ({ ...prev, [String(productId)]: quantity }));
  };

  const clearCart = () => {
    setCart([]);
    setQuantities({});
  };

  const isInCart = (productId: string) => {
    return cart.some(p => String(p.id) === String(productId));
  };

  const totalQuantity = Object.values(quantities).reduce(
    (sum, qty) => sum + qty,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        quantities,
        totalQuantity,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
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
