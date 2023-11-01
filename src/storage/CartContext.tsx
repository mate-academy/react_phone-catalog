import React, { useMemo } from 'react';
import { Product } from '../types/Product';
import { useLocalStorage } from '../helpers/useLocalStorage';

type CartItem = {
  id: number,
  quantity: number,
  product: Product,
};

type Context = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  isInCart: (productName: string) => boolean;
  changeQuantity: (productId: number, value: number) => void;
};

export const CartContext = React.createContext<Context>({
  cartItems: [],
  addToCart: () => { },
  removeFromCart: () => { },
  changeQuantity: () => { },
  isInCart: () => false,
});

type Props = {
  children: React.ReactNode;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [
    cartItems, setCartItems,
  ] = useLocalStorage<CartItem[]>('cartItems', []);

  const addToCart = (product: Product) => {
    const newItem = {
      id: cartItems.length + 1,
      quantity: 1,
      product,
    };

    setCartItems([...cartItems, newItem]);
  };

  const removeFromCart = (productName: string) => {
    setCartItems(cartItems
      .filter(curProd => curProd.product.name !== productName));
  };

  const changeQuantity = (itemId: number, value: number) => {
    setCartItems(cartItems
      .map(curItem => {
        return curItem.id === itemId
          ? { ...curItem, quantity: value }
          : curItem;
      }));
  };

  const isInCart = (productName: string) => cartItems
    .some(cart => cart.product.name === productName);

  const value = useMemo(() => ({
    cartItems,
    addToCart,
    removeFromCart,
    changeQuantity,
    isInCart,
  }), [cartItems]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
