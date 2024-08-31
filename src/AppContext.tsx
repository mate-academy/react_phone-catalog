import React from 'react';
import { Product } from './typies';
import { getProducts } from './api';

type AppContextTypes = {
  getProducts: () => Promise<Product[]>;
  products: Product[] | null;
  setProducts: (products: Product[]) => void;
};

export const AppContext = React.createContext({} as AppContextTypes);

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [products, setProducts] = React.useState<Product[] | null>(null);
  const [product, setProduct] = React.useState<Product | null>(null);

  React.useEffect(() => {
    getProducts()
      .then(productsList => setProducts(productsList))
      .catch(); // to-do: add Error message
  }, []);

  const value = {
    getProducts,
    products,
    setProducts,
    product,
    setProduct,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
