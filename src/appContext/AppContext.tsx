import React, { useEffect, useRef, useState } from 'react';
import { Product } from '../components/types/Product';
import { Phone } from '../components/types/Phone';
import { Tablet } from '../components/types/Tablet';

type AppContextProps = {
  app: React.RefObject<HTMLDivElement>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  products: Product[];
  productsTotalNumber: number;
  phonesTotalNumber: number;
  phones: Phone[];
  setPhones: React.Dispatch<React.SetStateAction<Phone[]>>;
  tablets: Tablet[];
  setTablets: React.Dispatch<React.SetStateAction<Tablet[]>>
  tabletsTotalNumber: number
};

type Props = {
  children: React.ReactNode;
};

export const ContextApp = React.createContext({} as AppContextProps);

export const AppContext: React.FC<Props> = ({ children }) => {
  const app = useRef(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [phones, setPhones] = useState<Phone[]>([]);
  const [tablets, setTablets] = useState<Tablet[]>([])
  const phonesTotalNumber = phones.length;
  const productsTotalNumber = products.length;
  const tabletsTotalNumber = tablets.length;

  useEffect(() => {
    fetch('./api/products.json')
      .then(response => response.json())
      .then(setProducts)
      .catch(err => {
        throw new Error(err);
      });
  }, []);

  useEffect(() => {
    fetch('./api/phones.json')
      .then(response => response.json())
      .then(setPhones)
      .catch(err => {
        throw new Error(err);
      });
  }, []);

  useEffect(() => {
    fetch('./api/tablets.json')
      .then(response => response.json())
      .then(setTablets)
      .catch(err => {
        throw new Error(err);
      });
  }, []);

  return (
    <ContextApp.Provider
      value={{
        tabletsTotalNumber,
        setTablets,
        tablets,
        app,
        phones,
        phonesTotalNumber,
        setPhones,
        productsTotalNumber,
        products,
        setProducts,
      }}
    >
      {children}
    </ContextApp.Provider>
  );
};
