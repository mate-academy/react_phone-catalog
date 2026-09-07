import React, { PropsWithChildren, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export interface InitialCartContext {
  cartItemsId: string[];
  toogleProductFromBag: (id: string) => void;
  deleteProductFromBag: (id: string) => void;
  addOneProduct: (id: string) => void;
  deleteOneProduct: (id: string) => void;
  deleteAllProductFromBag: () => void;
  haveItemInBag: (id: string) => boolean;
  countItemInBag: (id: string) => number;
  howManyItems: number;
}

export const ContextCart = React.createContext<InitialCartContext | null>(null);

export const ProviderCart: React.FC<PropsWithChildren> = ({ children }) => {
  const [cartItem, setCartItem] = useLocalStorage<string[]>('cart', []);

  const toogleProductFromBag = (id: string) =>
    setCartItem(oldItems =>
      oldItems.includes(id)
        ? oldItems.filter(item => item !== id)
        : [...oldItems, id],
    );

  const deleteProductFromBag = (id: string) =>
    setCartItem(oldItems => oldItems.filter(item => item !== id));

  const addOneProduct = (id: string) =>
    setCartItem(oldItems => [...oldItems, id]);

  const deleteOneProduct = (id: string) =>
    setCartItem(oldItems => {
      const index = oldItems.indexOf(id);

      if (index === -1) {
        return oldItems;
      }

      const newItems = [...oldItems];

      newItems.splice(index, 1);

      return newItems;
    });

  const deleteAllProductFromBag = () => setCartItem([]);

  const haveItemInBag = (id: string) => cartItem.includes(id);

  const howManyItems = cartItem.length;

  const countItemInBag = (id: string) =>
    cartItem.reduce((acc, item) => (item === id ? acc + 1 : acc), 0);

  const value: InitialCartContext = useMemo(
    () => ({
      cartItemsId: cartItem,
      toogleProductFromBag,
      deleteProductFromBag,
      addOneProduct,
      deleteOneProduct,
      deleteAllProductFromBag,
      haveItemInBag,
      countItemInBag,
      howManyItems,
    }),
    [cartItem],
  );
  return <ContextCart.Provider value={value}>{children}</ContextCart.Provider>;
};
