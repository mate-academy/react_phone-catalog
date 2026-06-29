import React, { useEffect, useMemo, useState } from 'react';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';
import { Product } from '../types/Product';
import { CartEntry } from '../types/CartItem';
import { LOCAL_STORAGE_KEYS } from '../constants/localeStorage';
import { MIN_QTY } from '../constants/Products/cart';

type StoreContextType = {
  cartList: CartEntry[];
  totalCartItems: number;
  addToCart: (product: Product) => void;
  deleteFromCart: (id: string) => void;
  clearCart: () => void;
  updateQty: (id: string, qty: number) => void;
  totalCartAmount: number;
};

export const CartContext = React.createContext<StoreContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

export const CartContextProvider: React.FC<Props> = ({ children }) => {
  const [cartList, setCartList] = useState<CartEntry[]>(() =>
    getFromLocalStorage(LOCAL_STORAGE_KEYS.cart, []),
  );

  const totalCartItems = useMemo(
    () => cartList.reduce((total, item) => total + item.qty, 0),
    [cartList],
  );

  const totalCartAmount = useMemo(
    () =>
      cartList.reduce((totalAmount, item) => {
        const productTotalAmount = item.product.fullPrice * item.qty;

        return totalAmount + productTotalAmount;
      }, 0),
    [cartList],
  );

  const addToCart = (product: Product) => {
    setCartList(prev => {
      const isAlreadyInCart = prev.some(p => p.id === product.itemId);

      if (isAlreadyInCart) {
        return prev;
      }

      return [...prev, { id: product.itemId, qty: 1, product }];
    });
  };

  const deleteFromCart = (id: string) => {
    setCartList(prev => prev.filter(p => p.id !== id));
  };

  const clearCart = () => {
    setCartList([]);
  };

  const updateQty = (id: string, qtyChange: number) => {
    setCartList(prev =>
      prev.map(item => {
        if (item.id !== id) {
          return item;
        }

        if (item.qty < MIN_QTY) {
          return item;
        }

        const updatedQty = item.qty + qtyChange;

        return { ...item, qty: updatedQty };
      }),
    );
  };

  const value = useMemo(
    () => ({
      cartList,
      totalCartItems,
      addToCart,
      deleteFromCart,
      clearCart,
      updateQty,
      totalCartAmount,
    }),
    [cartList, totalCartItems, totalCartAmount],
  );

  useEffect(() => {
    saveToLocalStorage(LOCAL_STORAGE_KEYS.cart, cartList);
  }, [cartList]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
