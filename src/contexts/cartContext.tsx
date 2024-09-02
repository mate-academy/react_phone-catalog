import { ReactNode, createContext, useCallback, useMemo } from 'react';
import { Product } from '../types/Product';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { CartActionType } from '../types/CartActionType';
import { isItemInArray } from '../utils/isItemInArray';

type CartContextType = {
  cart: Product[];
  updateCart: (product: Product | null, action: CartActionType) => void;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useLocalStorage<Product[]>('cart', []);

  const updateCart = useCallback(
    (item: Product | null, action: CartActionType) => {
      if (item === null && action === CartActionType.DELETE_ALL) {
        setCart([]);

        return;
      }

      let updatedCart: Product[] = [];

      if (item) {
        switch (action) {
          case CartActionType.ADD:
            if (!isItemInArray(cart, item.id)) {
              updatedCart = [...cart, item];
            } else {
              updatedCart = cart;
            }

            break;
          case CartActionType.DELETE:
            updatedCart = cart.filter(itemCart => itemCart.id !== item.id);
            break;
          case CartActionType.DELETE_ALL:
            updatedCart = [];
            break;
          case CartActionType.UPDATE:
            updatedCart = cart.map(itemCart =>
              itemCart.id === item.id ? { ...itemCart, ...item } : itemCart,
            );
            break;
          default:
            updatedCart = [...cart];
        }
      }

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
