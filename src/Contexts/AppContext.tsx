import React from 'react';
import { ProductType } from '../Types/ProductType';

type Props = {
  children: React.ReactNode;
};

type DefaultAppType = {
  products: ProductType[];
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
};

const DefaultAppValues = {
  products: [],
  setProducts: () => null,
};

export const appContext = React.createContext<DefaultAppType>(DefaultAppValues);

export const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = React.useState<ProductType[]>([]);

  const fetchData = React.useCallback(async () => {
    try {
      const data = await fetch('/_new/products.json');
      const newProd: ProductType[] = await data.json();

      setProducts(newProd);
    } catch {
      setProducts([]);
    }
  }, []);

  React.useEffect(() => {
    fetchData();
  }, []);

  const state: DefaultAppType = {
    products,
    setProducts,
  };

  return <appContext.Provider value={state}>{children}</appContext.Provider>;
};
