import {
  createContext, FC, useEffect, useState,
} from 'react';
import { useAsyncValue } from 'react-router-dom';
import { Product } from '../types/Product';
import { useLocalStorage } from '../hooks/useLocalStorage';

type Cart = {
  count: number;
  product: Product;
};

type ContextProps = {
  cart: Cart[],
  saveToCart: (product: Product) => void,
  removeFromCart: (productId: string) => void,
  isInCart: (productId: string) => boolean,
  changeCount: (id: string, count: 1 | -1) => void,
  totalPrice: number,
  totalItems: number,
};

export const CartContext = createContext<ContextProps>({
  cart: [],
  saveToCart: () => { },
  removeFromCart: () => { },
  isInCart: () => false,
  changeCount: () => { },
  totalPrice: 0,
  totalItems: 0,
});

type Props = {
  children: React.ReactNode;
};

export const CartProvider: FC<Props> = ({ children }) => {
  const IDs = useAsyncValue() as string[];

  const [cart, setCart] = useLocalStorage<Cart[]>('cart', []);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const newCart = cart.filter(
      ({ product }) => IDs.includes(product.productId),
    );

    setCart(newCart);
  }, [IDs]);

  useEffect(() => {
    const newTotalPrice = cart.reduce(
      (acc, { count, product }) => acc + count * product.discountPrice,
      0,
    );

    const newTotalItems = cart.reduce((acc, { count }) => acc + count, 0);

    setTotalItems(newTotalItems);
    setTotalPrice(newTotalPrice);
  }, [cart]);

  const isInCart = (id: string) => cart.some(
    ({ product }) => product.productId === id,
  );

  const saveToCart = (product: Product) => {
    if (isInCart(product.productId)) {
      return;
    }

    const newCart = [...cart, { count: 1, product }];

    setCart(newCart);
  };

  const removeFromCart = (productId: string) => {
    const newCart = cart.filter(
      ({ product }) => product.productId !== productId,
    );

    setCart(newCart);
  };

  const changeCount = (id: string, count: 1 | -1) => {
    const newCart = cart.map((cartItem) => {
      if (cartItem.product.productId !== id) {
        return cartItem;
      }

      return {
        ...cartItem,
        count: cartItem.count + count,
      };
    });

    setCart(newCart);
  };

  const contextValue = {
    cart,
    saveToCart,
    removeFromCart,
    isInCart,
    changeCount,
    totalPrice,
    totalItems,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};
