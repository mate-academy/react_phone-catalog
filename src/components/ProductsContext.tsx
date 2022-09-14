import React, { ReactNode, useMemo, useState } from 'react';
import { getProducts } from '../api/api';
import { Product } from '../types/Product';

type ContextValue = {
  products: Product[],
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

type Props = {
  children: ReactNode,
};

let productsFromServer:Product[] = [];

getProducts().then(res => {
  productsFromServer = res;
});

// function useLocalStorage<T>(key: string, initialValue: T) {
//   const [value, setValue] = useState(() => {
//     try {
//       return JSON.parse(localStorage.getItem(key) || '') || initialValue;
//     } catch {
//       return initialValue;
//     }
//   });

//   const save = (newValue: T) => {
//     setValue(newValue);
//     localStorage.setItem(key, JSON.stringify(newValue));
//   };

//   return [value, save];
// }

export const ProductsContext = React.createContext<ContextValue>({
  products: productsFromServer,
  setProducts: () => {},
});

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  // const [products, setProducts] = useLocalStorage<Product[]>('products', []);

  const [products, setProducts] = useState<Product[]>([]);

  const contextValue = useMemo(() => (
    {
      products,
      setProducts,
    }
  ), [products]);

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};
