import React, { useMemo } from 'react';
import { useLocalStorage } from '../modules/hooks/useLocalStorage';
import { CartItem } from '../types/CartItem';

type ContextType = {
  shoppingList: CartItem[];
  setShoppingList: React.Dispatch<CartItem[]>;
};

export const ShoppingCartContext = React.createContext<ContextType>({
  shoppingList: [],
  setShoppingList: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ShoppingCartProvider: React.FC<Props> = ({ children }) => {
  const [shoppingList, setShoppingList] = useLocalStorage<CartItem[]>(
    'CartItem',
    [],
  );

  const value = useMemo(
    () => ({ shoppingList, setShoppingList }),
    [shoppingList, setShoppingList],
  );

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
