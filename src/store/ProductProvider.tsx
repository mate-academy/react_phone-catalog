import { createContext, ReactNode, useEffect, useState } from 'react';
import { getData } from '../assets/services/httpClient';
import { Product } from '../types/Product';

type ProductContextType = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  loader: boolean;
};

export const ProductContext = createContext<ProductContextType>({
  products: [],
  setProducts: () => {},
  loader: true,
});

type Props = {
  children: ReactNode;
};

export const ProductProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getData<Product[]>('api/products.json')
      .then(setProducts)
      .catch(error => {
        throw new Error(error);
      })
      .finally(() => setLoader(false));
  }, []);

  return (
    <ProductContext.Provider value={{ products, setProducts, loader }}>
      {children}
    </ProductContext.Provider>
  );
};
