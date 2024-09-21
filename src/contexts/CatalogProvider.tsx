import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
} from 'react';
import { Product } from '../types/Product';

interface CatalogContextType {
  favorites: Product[];
  setFavorites: Dispatch<React.SetStateAction<Product[]>>;
  // hotProducts: Product[];
  // setHotProducts: Dispatch<React.SetStateAction<Product[]>>;
  // newProducts: Product[];
  // setNewProducts: Dispatch<React.SetStateAction<Product[]>>;
}

type Props = {
  children: ReactNode;
};

export const CatalogContext = createContext<CatalogContextType | undefined>(
  undefined,
);

export const CatalogProvider: React.FC<Props> = ({ children }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  return (
    <CatalogContext.Provider
      value={{
        setFavorites,
        favorites,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
};

export const useCatalog = (): CatalogContextType => {
  const context = useContext(CatalogContext);

  if (context === undefined) {
    throw new Error('useCatalog must be used within a CatalogProvider');
  }

  return context;
};
