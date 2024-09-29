import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  useCallback,
} from 'react';
import { Product } from '../types/Product';
import { useLocalStorage } from '../utils/hooks/useLocalStorage';

interface CatalogContextType {
  favorites: Product[];
  productsCategory: Product[];
  setProductsCategory: Dispatch<React.SetStateAction<Product[]>>;
  setFavorites: Dispatch<React.SetStateAction<Product[]>>;
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
}

type Props = {
  children: ReactNode;
};

export const CatalogContext = createContext<CatalogContextType | undefined>(
  undefined,
);

export const CatalogProvider: React.FC<Props> = ({ children }) => {
  const [favorites, setFavorites] = useLocalStorage('favourites', []);
  const [productsCategory, setProductsCategory] = useState<Product[]>([]);

  const addToFavorites = useCallback(
    (product: Product) => {
      setFavorites((prevFavorites: Product[]) => [...prevFavorites, product]);
    },
    [setFavorites],
  );

  const removeFromFavorites = useCallback(
    (productId: string) => {
      setFavorites((prevFavorites: Product[]) =>
        prevFavorites.filter(product => product.id !== productId),
      );
    },
    [setFavorites],
  );

  return (
    <CatalogContext.Provider
      value={{
        setFavorites,
        favorites,
        productsCategory,
        addToFavorites,
        setProductsCategory,
        removeFromFavorites,
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
