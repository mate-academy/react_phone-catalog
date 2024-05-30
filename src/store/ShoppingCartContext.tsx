import React, { useMemo } from 'react';
import { useLocalStorage } from '../modules/hooks/useLocalStorage';
// import { ShoppingCartList } from '../types/ShoppingCartList';

type ContextType = {
  shoppingList: string[];
  setShoppingList: React.Dispatch<string[]>;
};

export const ShoppingCartContext = React.createContext<ContextType>({
  shoppingList: [],
  setShoppingList: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ShoppingCartProvider: React.FC<Props> = ({ children }) => {
  const [shoppingList, setShoppingList] = useLocalStorage<string[]>(
    'itemId',
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
