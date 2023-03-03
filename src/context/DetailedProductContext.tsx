import React, { useState } from 'react';
import { Product } from '../types/types';

type DetailedProductContextValue = {
  detailedProduct: Product | undefined;
  setDetailedProduct: React.Dispatch<React.SetStateAction<Product | undefined>>;
};

export const DetailedProductContext
= React.createContext<null | DetailedProductContextValue>(null);

type Props = {
  children: React.ReactNode;
};

export const DetailedProductProvider: React.FC<Props> = ({ children }) => {
  const [detailedProduct, setDetailedProduct] = useState<Product>();

  return (
    <DetailedProductContext.Provider value={{
      detailedProduct, setDetailedProduct,
    }}
    >
      {children}
    </DetailedProductContext.Provider>
  );
};
