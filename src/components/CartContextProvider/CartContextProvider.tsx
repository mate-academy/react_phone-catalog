import React, { createContext, useCallback, useMemo } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { CartItemType } from '../../types/CartItemType';
import { Product } from '../../types/Product';

interface Cart {
  cart: CartItemType[];
  setCart: (cart: CartItemType[]) => void;
  toggleCartItem: (item: Product) => void;
}

export const CartContext = createContext<Cart>({
  cart: [],
  setCart: () => { },
  toggleCartItem: () => { },
});

interface Props {
  children: React.ReactNode;
}

export const CartContextProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useLocalStorage<CartItemType[]>('cart', []);

  const toggleCartItem = useCallback((item: Product) => {
    if (cart.some(({ id }) => id === item.id)) {
      setCart(cart.filter(({ item: product }) => product.id !== item.id));
    } else {
      setCart([...cart, {
        item,
        quantity: 1,
        id: item.id,
      }]);
    }
  }, [cart, setCart]);

  const value = useMemo(() => ({
    cart,
    setCart,
    toggleCartItem,
  }), [cart, setCart, toggleCartItem]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
