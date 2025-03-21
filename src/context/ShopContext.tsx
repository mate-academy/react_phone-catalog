/* eslint-disable @typescript-eslint/no-unused-vars */

import { createContext, ReactNode, useContext } from 'react';
import { Product } from '../types/Product';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ShopContext = createContext([] as Product[]);
const SetShopContext = createContext((v: Product[]) => {});

export const useShop = () => useContext(ShopContext);
export const useSetShop = () => useContext(SetShopContext);

type Props = {
  children: ReactNode;
};
export const ShopProvider: React.FC<Props> = ({ children }) => {
  const [shop, setShop] = useLocalStorage<Product[]>('cart', []);

  return (
    <SetShopContext.Provider value={setShop}>
      <ShopContext.Provider value={shop}>{children}</ShopContext.Provider>
    </SetShopContext.Provider>
  );
};
