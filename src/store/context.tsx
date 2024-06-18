import React, { useMemo, ReactNode, useState } from 'react';
import { createContext } from 'react';
import { ProductInfo } from '../types/ProductInfo';

interface AppContextType {
  likedProducts: ProductInfo[];
  setLikedProducts: (products: ProductInfo[]) => void;
}

export const AppContext = createContext<AppContextType>({
  likedProducts: [],
  setLikedProducts: () => {},
});

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [likedProducts, setLikedProducts] = useState<ProductInfo[]>([]);

  const value = useMemo(
    () => ({
      likedProducts,
      setLikedProducts,
    }),
    [likedProducts],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
