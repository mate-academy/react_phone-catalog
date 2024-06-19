import React, { useState } from 'react';
import { ProductDetail } from '../types/ProductDetail';

export const AccessoriesContext = React.createContext<{
  accessories: ProductDetail[];
}>({
  accessories: [],
});

export type Props = {
  children: React.ReactNode;
};

export const AccessoriesProvider: React.FC<Props> = ({ children }) => {
  const [accessories] = useState<ProductDetail[]>([]);

  const getStoreValues = () => {
    return { accessories };
  };

  return (
    <AccessoriesContext.Provider value={getStoreValues()}>
      {children}
    </AccessoriesContext.Provider>
  );
};
