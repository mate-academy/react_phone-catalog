import React, { useState } from 'react';
import { ProductDetail } from '../types/ProductDetail';

export const PhonesContext = React.createContext<{
  phones: ProductDetail[];
}>({
  phones: [],
});

type Props = {
  children: React.ReactNode;
};

export const PhonesProvider: React.FC<Props> = ({ children }) => {
  const [phones] = useState<ProductDetail[]>([]);

  const getStoreValues = () => {
    return { phones };
  };

  return (
    <PhonesContext.Provider value={getStoreValues()}>
      {children}
    </PhonesContext.Provider>
  );
};
