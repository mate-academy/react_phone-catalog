import React, { useState } from 'react';

export const DetailedProductContext
= React.createContext<null | any>(null);

type Props = {
  children: React.ReactNode;
};

export const DetailedProductProvider: React.FC<Props> = ({ children }) => {
  const [detailedProduct, setDetailedProduct] = useState();

  return (
    <DetailedProductContext.Provider value={{
      detailedProduct, setDetailedProduct,
    }}
    >
      {children}
    </DetailedProductContext.Provider>
  );
};
