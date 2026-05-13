import React, {
  createContext,
  useContext,
  useMemo,
  useCallback,
  useState,
} from 'react';
import { Product } from '../types/Product';
import { useLocalStorage } from '../hooks/useLocalStorage';

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  totalAmount: number;
  totalItems: number;
  isCheckout: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  changeQuantity: (productId: number, delta: number) => void;
  handleCheckout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useLocalStorage<CartItem[]>('cart', []);
  const [isCheckout, setIsCheckout] = useState(false);

  const addToCart = useCallback(
    (product: Product) => {
      setCart((currentCart: CartItem[]) => {
        const existingItem = currentCart.find(
          (item: CartItem) => item.id === product.id,
        );

        if (existingItem) {
          return currentCart.map((item: CartItem) => {
            return item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item;
          });
        }

        return [...currentCart, { ...product, quantity: 1 }];
      });
    },
    [setCart],
  );

  const removeFromCart = useCallback(
    (productId: number) => {
      setCart((currentCart: CartItem[]) => {
        return currentCart.filter((item: CartItem) => item.id !== productId);
      });
    },
    [setCart],
  );

  const changeQuantity = useCallback(
    (productId: number, delta: number) => {
      setCart((currentCart: CartItem[]) => {
        return currentCart.map((item: CartItem) => {
          if (item.id === productId) {
            const newQuantity = item.quantity + delta;

            return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
          }

          return item;
        });
      });
    },
    [setCart],
  );

  const handleCheckout = useCallback(() => {
    setIsCheckout(true);
    setTimeout(() => {
      setIsCheckout(false);
    }, 3000);
  }, []);

  const totalAmount = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart],
  );

  const totalItems = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart],
  );

  const value = useMemo(
    () => ({
      cart,
      totalAmount,
      totalItems,
      isCheckout,
      addToCart,
      removeFromCart,
      changeQuantity,
      handleCheckout,
    }),
    [
      cart,
      totalAmount,
      totalItems,
      isCheckout,
      addToCart,
      removeFromCart,
      changeQuantity,
      handleCheckout,
    ],
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
