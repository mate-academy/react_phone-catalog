import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  useEffect,
} from 'react';
import { Product } from '../types/Product';
import { getAllProducts } from '../services/Product';

interface CatalogContextType {
  favorites: Product[];
  products: Product[];
  setFavorites: Dispatch<React.SetStateAction<Product[]>>;
}

type Props = {
  children: ReactNode;
};

export const CatalogContext = createContext<CatalogContextType | undefined>(
  undefined,
);

export const CatalogProvider: React.FC<Props> = ({ children }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getAllProducts();

      setProducts(data);
    };

    fetchProduct();
  }, []);

  return (
    <CatalogContext.Provider
      value={{
        setFavorites,
        favorites,
        products,
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
