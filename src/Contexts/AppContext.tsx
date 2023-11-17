import {
  createContext, useState, useCallback, useEffect,
} from 'react';
import { ProductType } from '../Types/ProductType';
import { PhoneType } from '../Types/PhoneType';

type Props = {
  children: React.ReactNode;
};

type DefaultAppType = {
  products: ProductType[];
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  currentItem: PhoneType | null;
  setCurrentItem: React.Dispatch<React.SetStateAction<PhoneType | null>>;
  perPage: OptionType;
  setPerPage: React.Dispatch<React.SetStateAction<OptionType>>;
};

export type OptionType = { value: number; label: string };

const DefaultAppValues = {
  products: [],
  setProducts: () => null,
  currentItem: null,
  setCurrentItem: () => null,
  perPage: {
    value: 8,
    label: '8',
  },
  setPerPage: () => null,
};

export const appContext = createContext<DefaultAppType>(DefaultAppValues);

export const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [currentItem, setCurrentItem] = useState<PhoneType | null>(null);
  const [perPage, setPerPage] = useState<OptionType>(DefaultAppValues.perPage);

  const fetchData = useCallback(async () => {
    try {
      const data = await fetch('/_new/products.json');
      const newProd: ProductType[] = await data.json();

      setProducts(newProd);
    } catch {
      setProducts([]);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const state: DefaultAppType = {
    products,
    setProducts,
    currentItem,
    setCurrentItem,
    perPage,
    setPerPage,
  };

  return <appContext.Provider value={state}>{children}</appContext.Provider>;
};
