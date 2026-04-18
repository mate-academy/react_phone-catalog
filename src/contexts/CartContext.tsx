import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { Product } from '@/types/Product';
import type { CartItem } from '@/types/CartItem';
import { loadFromStorage } from '@/utils/storage';

const STORAGE_KEY = 'cart';

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  toggleCart: (product: Product) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: number) => boolean;
  cartCount: number;
  cartTotal: number;
};

const CartContext = createContext<CartContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const CartProvider = ({ children }: Props) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() =>
    loadFromStorage<CartItem[]>(STORAGE_KEY, []),
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      let found = false;
      const updatedList = prev.map(item => {
        if (item.product.id === product.id) {
          found = true;

          return { ...item, quantity: item.quantity + 1 };
        }

        return item;
      });

      return found ? updatedList : [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCartItems(prev => {
      if (quantity <= 0) {
        return prev.filter(item => item.product.id !== productId);
      }

      return prev.map(item => {
        if (item.product.id === productId) {
          return { ...item, quantity };
        }

        return item;
      });
    });
  };

  const clearCart = () => setCartItems([]);

  const isInCart = (productId: number) =>
    cartItems.some(item => item.product.id === productId);

  const toggleCart = (product: Product) =>
    isInCart(product.id) ? removeFromCart(product.id) : addToCart(product);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        toggleCart,
        updateQuantity,
        clearCart,
        isInCart,
        cartCount,
        cartTotal,
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
