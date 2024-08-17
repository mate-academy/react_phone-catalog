import { ReactNode, createContext, useCallback, useMemo } from 'react';
import { Product } from '../types/Product';
import { useLocalStorage } from '../hooks/useLocalStorage';

type CartContextType = {
  cart: Product[];
  updateCart: (product: Product) => void;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useLocalStorage<Product[]>('cart', []);

  const updateCart = useCallback(
    (item: Product) => {
      const itemWithCount = { ...item };

      itemWithCount.count = 1;
      const hasAddedToCart = cart.some(cartItem => cartItem.id === item.id);
      const updatedCart = hasAddedToCart
        ? cart.filter(itemCart => itemCart.id !== item.id)
        : [...cart, itemWithCount];

      setCart(updatedCart);
    },
    [cart, setCart],
  );

  const value = useMemo(
    () => ({
      cart,
      updateCart,
    }),
    [cart, updateCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
