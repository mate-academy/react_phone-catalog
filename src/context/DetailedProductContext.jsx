import React, { useState } from 'react';

export const DetailedProductContext = React.createContext(null);

export const DetailedProductProvider = ({ children }) => {
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
