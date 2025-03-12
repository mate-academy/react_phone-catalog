import React, {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Product } from '../../types/Products';

export const ProductContext = createContext({
  products: [] as Product[],
  productsPhoneLength: 0,
  productsTabletLength: 0,
  productsAccessoriesLength: 0,
});

type Props = {
  children: ReactNode;
};

export const ProductProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const productsPhoneLength = products.filter(
    item => item.category === 'phones',
  ).length;
  const productsTabletLength = products.filter(
    item => item.category === 'tablets',
  ).length;
  const productsAccessoriesLength = products.filter(
    item => item.category === 'accessories',
  ).length;

  const API_URL = './api/products.json';

  useEffect(() => {
    fetch(API_URL)
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        throw new Error('Failed to fetch products');
      })
      .then((data: Product[]) => {
        setProducts(data);
      })
      .catch(error => {
        throw error;
      });
  }, []);

  const value = useMemo(
    () => ({
      products,
      productsPhoneLength,
      productsTabletLength,
      productsAccessoriesLength,
    }),
    [products],
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
