import { createContext, useMemo } from 'react';
import {
  LocalStorageKeys,
  UpdatedProduct,
} from '../modules/shared/Types/types';
import { useLocalStorage } from '../hooks/UseLocalStorageHook';

export const CartStoreContext = createContext({
  cartList: [],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setCartList: (_newList: UpdatedProduct[]) => {},
});

export const CartStoreProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cartList, setCartList] = useLocalStorage<UpdatedProduct[]>(
    LocalStorageKeys.cart,
    [],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value = useMemo(() => ({ cartList, setCartList }), [cartList]);

  return (
    <CartStoreContext.Provider value={value}>
      {children}
    </CartStoreContext.Provider>
  );
};
