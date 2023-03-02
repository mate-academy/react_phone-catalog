import React, { useState } from 'react';
import { Product } from '../types/types';

export const DetailedProductContext
= React.createContext<null | any>(null);

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
