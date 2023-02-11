import React, { useEffect, useState } from 'react';
// import { TodoContextType } from '../../types/TodoContextType';

export const DetailedProductContext = React.createContext(null);

// type Props = {
//   children: React.ReactNode;
// };

export const DetailedProductProvider = ({ children }) => {
  const [detailedProduct, setDetailedProduct] = useState();

  // const [visibleTodos, setVisibleTodos] = useState(todos);

  return (
    <DetailedProductContext.Provider value={{
      detailedProduct, setDetailedProduct,
    }}
    >
      {children}
    </DetailedProductContext.Provider>
  );
};
