import React, {
  useMemo, useState, useEffect, useContext,
} from 'react';
import { Product } from '../types/Product';
import { getProducts } from './getData';
import { ErrorContext } from './ErrorContext';
import { ErrorText } from '../types/ErrorText';

interface ProductsContextType {
  productsFromServer: Product[],
  setProductsFromServer: (products: Product[]) => void,

  isLoadProducts: boolean,
  setIsLoadProducts: (isLoad: boolean) => void,
}

export const ProductsContext = React.createContext<ProductsContextType>({
  productsFromServer: [],
  setProductsFromServer: () => {},

  isLoadProducts: false,
  setIsLoadProducts: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ProductsProvider = ({ children }: Props) => {
  const [productsFromServer, setProductsFromServer] = useState<Product[]>([]);
  const [isLoadProducts, setIsLoadProducts] = useState(false);
  const { setError } = useContext(ErrorContext);

  const contextValues = useMemo(() => (
    {
      productsFromServer,
      setProductsFromServer,
      isLoadProducts,
      setIsLoadProducts,
    }
  ), [productsFromServer, isLoadProducts]);

  const loadProductsFromServer = async () => {
    try {
      setIsLoadProducts(true);
      const products = await getProducts();

      setProductsFromServer(products);
    } catch {
      setError(ErrorText.LOAD_Products);
    } finally {
      setIsLoadProducts(false);
    }
  };

  useEffect(() => {
    loadProductsFromServer();
  }, []);

  return (
    <ProductsContext.Provider value={contextValues}>
      {children}
    </ProductsContext.Provider>
  );
};
