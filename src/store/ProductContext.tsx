import React, {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { ProductType } from '../modules/shared/types/ProductType';
type Props = {
  children: ReactNode;
};
type ProductContextType = {
  products: ProductType[];
  setProducts: Dispatch<React.SetStateAction<ProductType[]>>;
  isLoading: boolean;
  errorMsg: string;
};
// eslint-disable-next-line prettier/prettier, max-len
export const ProductContext = createContext<ProductContextType | undefined>(
  undefined,
);
export const ProductProvider: FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const fetchProducts = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const response = await fetch('./api/products.json');

      if (!response.ok) {
        throw new Error('Something went wrong. Please try again.');
      }

      const data: ProductType[] = await response.json();

      setProducts(data);
    } catch (err) {
      setErrorMsg('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const value = useMemo(
    () => ({
      products,
      setProducts,
      isLoading,
      errorMsg,
    }),
    [products, isLoading, errorMsg],
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }

  return context;
};
