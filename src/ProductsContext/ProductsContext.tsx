import React, { useState, useEffect, useMemo } from 'react';
import { getProducts } from '../api/products';
import { Product } from '../types/Product';

type ContextProps = {
  products: Product[]
  setProducts: React.Dispatch<React.SetStateAction<Product[] | []>>
};

export const ProductsContext = React.createContext<ContextProps>({
  products: [],
  setProducts: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[] | []>([]);

  const fetchProducts = async () => {
    const res = await getProducts();

    setProducts(res);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const contextValue = useMemo(() => {
    return {
      products,
      setProducts,
    };
  }, [products]);

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};
