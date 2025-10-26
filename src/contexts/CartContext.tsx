import { createContext, useContext, ReactNode, useMemo } from 'react';
import { Product } from '../types/Product';
import { useLocalStorage } from '../hooks/useLocalStorage';

export type CartItemType = {
  product: Product;
  quantity: number;
};

type CartContextType = {
  items: CartItemType[];
  addToCart: (product: Product) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalCount: () => number;
  isInCart: (itemId: string) => boolean;
  getQuantity: (itemId: string) => number;
  incrementQuantity: (itemId: string) => void;
  decrementQuantity: (itemId: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const CartProvider = ({ children }: Props) => {
  const [items, setItems] = useLocalStorage<CartItemType[]>('cart', []);

  const addToCart = (product: Product) => {
    const existingItem = items.find((item) => item.product.itemId === product.itemId);

    if (existingItem) {
      setItems(
        items.map((item) =>
          item.product.itemId === product.itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setItems([...items, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId: string) => {
    setItems(items.filter((item) => item.product.itemId !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setItems(
      items.map((item) =>
        item.product.itemId === itemId ? { ...item, quantity } : item
      )
    );
  };

  const incrementQuantity = (itemId: string) => {
    setItems(
      items.map((item) =>
        item.product.itemId === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrementQuantity = (itemId: string) => {
    setItems(
      items
        .map((item) => {
          if (item.product.itemId === itemId) {
            const newQuantity = item.quantity - 1;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const getTotalCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const isInCart = (itemId: string) => {
    return items.some((item) => item.product.itemId === itemId);
  };

  const getQuantity = (itemId: string) => {
    const item = items.find((item) => item.product.itemId === itemId);
    return item ? item.quantity : 0;
  };

  const value = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalCount,
      isInCart,
      getQuantity,
      incrementQuantity,
      decrementQuantity,
    }),
    [items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
