import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type React from 'react';
import type { CartItem } from '../types/CartItem';
import { STORAGE_CART_KEY } from '../constants/storage-keys';
import type { CartContextType } from '../types/CartContextType';

const CartContext = createContext<CartContextType | null>(null);

const getStorageData = (): CartItem[] => {
  try {
    const data = localStorage.getItem(STORAGE_CART_KEY);
    const parsedData = JSON.parse(data ?? '[]');

    return Array.isArray(parsedData) ? parsedData : [];
  } catch {
    return [];
  }
};

export const CartProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>(getStorageData);

  useEffect(() => {
    localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextType>(
    () => ({
      items,
      totalCount: items.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: items.reduce(
        (sum, item) => sum + item.product.priceDiscount * item.quantity,
        0,
      ),
      isInCart: productId => items.some(item => item.id === productId),
      addToCart: product =>
        setItems(current =>
          current.some(item => item.id === product.id)
            ? current
            : [...current, { id: product.id, quantity: 1, product }],
        ),
      removeFromCart: id =>
        setItems(current => current.filter(item => item.id !== id)),
      changeQuantity: (id, delta) =>
        setItems(current =>
          current.map(item =>
            item.id === id
              ? { ...item, quantity: Math.max(1, item.quantity + delta) }
              : item,
          ),
        ),
      clearCart: () => setItems([]),
    }),
    [items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
};
