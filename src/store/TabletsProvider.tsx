import React, { useState } from 'react';

import { ProductDetail } from '../types/ProductDetail';

export const TabletsContext = React.createContext<{
  tablets: ProductDetail[];
}>({
  tablets: [],
});

type Props = {
  children: React.ReactNode;
};

export const TabletsProvider: React.FC<Props> = ({ children }) => {
  const [tablets] = useState<ProductDetail[]>([]);

  const getStoreValues = () => {
    return { tablets };
  };

  return (
    <TabletsContext.Provider value={getStoreValues()}>
      {children}
    </TabletsContext.Provider>
  );
};
