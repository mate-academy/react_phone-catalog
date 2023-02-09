import React, { useEffect, useState } from 'react';
// import { TodoContextType } from '../../types/TodoContextType';

export const ProductContext = React.createContext(null);

// type Props = {
//   children: React.ReactNode;
// };

export const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState();

  // const [visibleTodos, setVisibleTodos] = useState(todos);

  return (
    <ProductContext.Provider value={{
      product, setProduct,
    }}
    >
      {children}
    </ProductContext.Provider>
  );
};
