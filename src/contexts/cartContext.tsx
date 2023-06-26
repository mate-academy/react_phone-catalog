import {
  createContext, useContext, useMemo, useState,
} from 'react';
import { CartItem, CartProduct } from '../types/cartItem';

type ContextValue = {
  cartItems: CartItem[];
  addCartItem: (product: CartProduct) => void;
  deleteCartItem: (itemId: string) => void;
  changeItemQuantity: (itemId: string, operation: 1 | -1) => void;
};

const CartContext = createContext<ContextValue>({
  cartItems: [],
  addCartItem: () => {},
  deleteCartItem: () => {},
  changeItemQuantity: () => {},
});

export const CartProvider = ({
  children,
}: React.PropsWithChildren<React.ReactNode>) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addCartItem = (product: CartProduct) => {
    const cartItem = {
      product,
      id: product.itemId,
      quantity: 1,
    };

    setCartItems(current => current.concat(cartItem));
  };

  const deleteCartItem = (itemId: string) => {
    setCartItems(current => [...current.filter(item => itemId !== item.id)]);
  };

  const changeItemQuantity = (itemId: string, operation: 1 | -1) => {
    setCartItems(current =>
      current.map(item => {
        if (item.id === itemId) {
          const newQuantity = item.quantity + operation;

          return { ...item, quantity: newQuantity };
        }

        return item;
      }));
  };

  const value = useMemo(() => {
    return {
      cartItems,
      addCartItem,
      deleteCartItem,
      changeItemQuantity,
    };
  }, [cartItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  return context;
};
