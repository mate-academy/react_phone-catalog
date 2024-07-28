import { createContext, ReactNode, useEffect, useState } from 'react';
import { getData } from '../assets/services/httpClient';
import { Product } from '../types/Product';

type ProductContextType = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

export const ProductContext = createContext<ProductContextType>({
  products: [],
  setProducts: () => {},
});

type Props = {
  children: ReactNode;
};

export const ProductProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getData<Product[]>('api/products.json')
      .then(setProducts)
      .catch(error => {
        throw new Error(error);
      });
  }, []);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
