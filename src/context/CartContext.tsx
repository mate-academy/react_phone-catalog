import { createContext, useContext, useMemo, ReactNode } from 'react';
import { CartItem } from '@/types/CartItem';
import { Product } from '@/types/Product';
import { useLocalStorageState } from '@/utils/useLocalStorageState';

type CartContextValue = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  isInCart: (id: string) => boolean;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useLocalStorageState<CartItem[]>(
    'cart',
    [],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      cartItems,
      addToCart: product => {
        setCartItems(current => {
          if (current.some(item => item.id === product.itemId)) {
            return current;
          }

          return [...current, { id: product.itemId, quantity: 1, product }];
        });
      },
      removeFromCart: id => {
        setCartItems(current => current.filter(item => item.id !== id));
      },
      setQuantity: (id, quantity) => {
        setCartItems(current =>
          current.map(item => (item.id === id ? { ...item, quantity } : item)),
        );
      },
      isInCart: id => cartItems.some(item => item.id === id),
      clearCart: () => setCartItems([]),
    }),
    [cartItems, setCartItems],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
