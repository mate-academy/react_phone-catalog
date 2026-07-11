import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';

type CartContextType = {
  cartItems: CartItem[];
  totalQuantity: number;
  totalAmount: number;
  isInCart: (productId: number) => boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  incrementQuantity: (productId: number) => void;
  decrementQuantity: (productId: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = 'cart';

const isValidCartItem = (item: unknown): item is CartItem => {
  return (
    typeof item === 'object' &&
    item !== null &&
    'id' in item &&
    'quantity' in item &&
    'product' in item &&
    typeof (item as CartItem).product === 'object' &&
    (item as CartItem).product !== null
  );
};

const getInitialCart = (): CartItem[] => {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return [];
  }

  try {
    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isValidCartItem);
  } catch {
    return [];
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(getInitialCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const isInCart = (productId: number) => {
    return cartItems.some(item => item.id === productId);
  };

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      if (prev.some(item => item.id === product.id)) {
        return prev;
      }

      return [...prev, { id: product.id, quantity: 1, product }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const incrementQuantity = (productId: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decrementQuantity = (productId: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalQuantity = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const totalAmount = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + item.quantity * item.product.price,
        0,
      ),
    [cartItems],
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalQuantity,
        totalAmount,
        isInCart,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
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
