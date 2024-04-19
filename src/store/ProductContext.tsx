import React, { useEffect, useState } from 'react';
import { client } from '../api';
import { Product } from '../types/Product';

type ContextType = {
  dataLoaded: boolean;
  phones: Product[];
  tablets: Product[];
  accessories: Product[];
};

export const ProductContext = React.createContext<ContextType>({
  dataLoaded: false,
  phones: [],
  tablets: [],
  accessories: [],
});

type Props = {
  children: React.ReactNode;
};

const PRODUCT_URL = 'products.json';

export const ProductProvider: React.FC<Props> = ({ children }) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const phones = products.filter(product => product.category === 'phones');
  const tablets = products.filter(product => product.category === 'tablets');
  const accessories = products.filter(
    product => product.category === 'accessories',
  );

  useEffect(() => {
    setDataLoaded(false);

    client
      .get<Product[]>(PRODUCT_URL)
      .then(data => {
        setProducts(data);
        setDataLoaded(true);
      })
      .catch(() => {});
  }, []); // fetch

  const value = { dataLoaded, phones, tablets, accessories };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
