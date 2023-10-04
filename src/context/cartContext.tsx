import React, { ReactNode, useMemo } from 'react';
import { useLocalStorage } from 'hooks';
import { CartProduct } from 'types';

type ProductContext = {
  cart: CartProduct[],
  addToCart: (product: CartProduct[]) => void,
  totalPrice: number,
  totalQuantity: number,
};

export const CartContext = React
  .createContext<ProductContext>({} as ProductContext);

type Props = {
  children: ReactNode,
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, addToCart] = useLocalStorage<CartProduct[]>('cart', []);

  const totalPrice = useMemo(() => {
    return cart
      .reduce((prev, next) => prev + (next.price * next.cartQuantity), 0);
  }, [cart]);

  const totalQuantity = useMemo(() => {
    return cart.reduce((prev, next) => prev + next.cartQuantity, 0);
  }, [cart]);

  const value = {
    cart,
    addToCart,
    totalPrice,
    totalQuantity,
  };

  return (
    <CartContext.Provider
      value={value}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (
): ProductContext => React.useContext(CartContext);
