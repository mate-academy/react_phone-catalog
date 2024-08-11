import React, { useEffect, useMemo, useState } from 'react';
import { Product } from '../types/Product';
import { getProducts } from '../../utils/httpClient';

type ProductsStore = {
  products: Product[];
};

export const ProductContext = React.createContext<ProductsStore>({
  products: [],
});

type Props = {
  children: React.ReactNode;
};

export const ProductProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[] | []>([]);

  useEffect(() => {
    getProducts().then(data => setProducts(data));
  }, []);

  const productsStore: ProductsStore = useMemo(
    () => ({
      products,
    }),
    [products],
  );

  return (
    <ProductContext.Provider value={productsStore}>
      {children}
    </ProductContext.Provider>
  );
};
