import {
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Item } from '../types/Item';
import { getAllProducts } from '../helpers/getProducts';

type ContextType = {
  products: Item[];
  isLoading: boolean;
  setProducts: (products: Item[]) => void;
};

const defaultValue: ContextType = {
  products: [],
  isLoading: false,
  setProducts: () => { },
};

export const ProductsContext = createContext(defaultValue);

export const ProductsProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const value = useMemo(() => ({
    products,
    isLoading,
    setProducts,
  }), [products]);

  useEffect(() => {
    setIsLoading(true);
    getAllProducts()
      .then(setProducts)
      .catch(() => {
        throw new Error('Error while fetching products');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
