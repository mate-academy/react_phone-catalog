import { createContext, ReactNode, useEffect, useState } from 'react';
import { getData } from '../services/httpClient';
import { Product } from '../types/Product';

type ProductContextType = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  loader: boolean;
  errorMessage: boolean;
};

export const ProductContext = createContext<ProductContextType>({
  products: [],
  setProducts: () => {},
  loader: true,
  errorMessage: false,
});

type Props = {
  children: ReactNode;
};

export const ProductProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const [loader, setLoader] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    setErrorMessage(false);

    getData<Product[]>('api/products.json')
      .then(setProducts)
      .catch(error => {
        setErrorMessage(true);
        throw new Error(error);
      })
      .finally(() => setLoader(false));
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, setProducts, loader, errorMessage }}
    >
      {children}
    </ProductContext.Provider>
  );
};
