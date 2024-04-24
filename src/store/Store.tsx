import React, { createContext, useContext } from 'react';
import { Product } from '../types/Product';
import useLocalStorage from '../hooks/useLocalStorage';

type ProductContextType = {
  favourites: Product[];
  setFavourites: (product: Product[]) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

const StoreProvider: React.FC<Props> = ({ children }) => {
  const [favourites, setFavourites] = useLocalStorage<Product[]>(
    'favourites',
    [],
  );

  return (
    <ProductContext.Provider
      value={{
        favourites,
        setFavourites,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default StoreProvider;

export const useProduct = () => {
  const context = useContext(ProductContext);

  if (context === undefined) {
    throw new Error('useProduct must be used within a ProductProvider');
  }

  return context;
};

export { ProductContext };
