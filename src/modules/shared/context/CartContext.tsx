import React, { createContext, useContext, useMemo } from 'react';
import { CartItem, Product } from '@shared/types';
import { useLocalStorage } from '@shared/hooks';

interface CartContextValue {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  isInCart: (itemId: string) => boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (itemId: string) => void;
  setQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue>({
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  isInCart: () => false,
  addToCart: () => {},
  removeFromCart: () => {},
  setQuantity: () => {},
  clearCart: () => {},
});

export const useCart = () => useContext(CartContext);

interface Props {
  children: React.ReactNode;
}

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [items, setItems] = useLocalStorage<CartItem[]>('cart', []);

  const value = useMemo<CartContextValue>(() => {
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

    const totalPrice = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );

    return {
      items,
      totalQuantity,
      totalPrice,

      isInCart: (itemId: string) => items.some(item => item.id === itemId),

      // Adding a product already in the cart does nothing; the buttons that
      // call this switch to `Added to cart` and remove it on the next click.
      addToCart: (product: Product) =>
        setItems(current =>
          current.some(item => item.id === product.itemId)
            ? current
            : [...current, { id: product.itemId, quantity: 1, product }],
        ),

      removeFromCart: (itemId: string) =>
        setItems(current => current.filter(item => item.id !== itemId)),

      setQuantity: (itemId: string, quantity: number) =>
        setItems(current =>
          current.map(item =>
            item.id === itemId
              ? { ...item, quantity: Math.max(quantity, 1) }
              : item,
          ),
        ),

      clearCart: () => setItems([]),
    };
  }, [items, setItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
