import React, { useMemo, ReactNode, useState } from 'react';
import { createContext } from 'react';
import { ProductInfo } from '../types/ProductInfo';
import { ProductWithQuantity } from '../types/ProductWithQuantity';

interface AppContextType {
  likedProducts: ProductInfo[];
  setLikedProducts: (products: ProductInfo[]) => void;
  selectedProducts: ProductWithQuantity[];
  setSelectedProducts: (products: ProductWithQuantity[]) => void;
}

export const AppContext = createContext<AppContextType>({
  likedProducts: [],
  setLikedProducts: () => {},
  selectedProducts: [],
  setSelectedProducts: () => {},
});

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [likedProducts, setLikedProducts] = useState<ProductInfo[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<
    ProductWithQuantity[]
  >([]);

  const value = useMemo(
    () => ({
      likedProducts,
      setLikedProducts,
      selectedProducts,
      setSelectedProducts,
    }),
    [likedProducts, selectedProducts],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
