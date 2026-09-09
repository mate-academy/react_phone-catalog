import { createContext, useContext, useMemo, ReactNode } from 'react';
import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';
import { useLocalStorage } from '../hooks/useLocalStorage';

type CartContextValue = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  changeQuantity: (id: number, delta: number) => void;
  clearCart: () => void;
  isInCart: (id: number) => boolean;
  totalQuantity: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useLocalStorage<CartItem[]>('cart', []);

  const addToCart = (product: Product) => {
    if (items.some(item => item.id === product.id)) {
      return;
    }

    setItems([...items, { id: product.id, quantity: 1, product }]);
  };

  const removeFromCart = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  // quantity не опускается ниже 1: убрать товар можно только крестиком
  const changeQuantity = (id: number, delta: number) => {
    setItems(
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const clearCart = () => setItems([]);

  const isInCart = (id: number) => items.some(item => item.id === id);

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0,
  );

  const value = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      changeQuantity,
      clearCart,
      isInCart,
      totalQuantity,
      totalPrice,
    }),
    // всё внутри вычисляется из items, поэтому одной зависимости достаточно
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return context;
};
