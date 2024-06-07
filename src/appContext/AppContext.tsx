import React, { useEffect, useRef, useState } from 'react';
import { Product } from '../components/types/Product';
import { Phone } from '../components/types/Phone';
import { Tablet } from '../components/types/Tablet';
import { Accessory } from '../components/types/Accessory';

type AppContextProps = {
  app: React.RefObject<HTMLDivElement>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  products: Product[];
  productsTotalNumber: number;
  phonesTotalNumber: number;
  phones: Phone[];
  setPhones: React.Dispatch<React.SetStateAction<Phone[]>>;
  tablets: Tablet[];
  setTablets: React.Dispatch<React.SetStateAction<Tablet[]>>;
  tabletsTotalNumber: number;
  accessoriesTotalNumber: number;
  accessories: Accessory[];
  setAccessories: React.Dispatch<React.SetStateAction<Accessory[]>>;
  isLoadingPoducts: boolean;
  setIsLoadingPoducts: React.Dispatch<React.SetStateAction<boolean>>;
  isLoadingPhones: boolean;
  setIsLoadingPhones: React.Dispatch<React.SetStateAction<boolean>>;
  isLoadingTablets: boolean;
  setIsLoadingTablets: React.Dispatch<React.SetStateAction<boolean>>;
  isLoadingAccessories: boolean;
  setIsLoadingAccessories: React.Dispatch<React.SetStateAction<boolean>>;
};

type Props = {
  children: React.ReactNode;
};

export const ContextApp = React.createContext({} as AppContextProps);

export const AppContext: React.FC<Props> = ({ children }) => {
  const app = useRef(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [phones, setPhones] = useState<Phone[]>([]);
  const [tablets, setTablets] = useState<Tablet[]>([]);
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [isLoadingPoducts, setIsLoadingPoducts] = useState(false);
  const [isLoadingPhones, setIsLoadingPhones] = useState(false);
  const [isLoadingTablets, setIsLoadingTablets] = useState(false);
  const [isLoadingAccessories, setIsLoadingAccessories] = useState(false);
  const accessoriesTotalNumber = accessories.length;
  const phonesTotalNumber = phones.length;
  const productsTotalNumber = products.length;
  const tabletsTotalNumber = tablets.length;

  useEffect(() => {
    setIsLoadingAccessories(true);
    fetch('./api/accessories.json')
      .then(response => response.json())
      .then(setAccessories)
      .catch(err => {
        throw new Error(err);
      })
      .finally(() => {
        setIsLoadingAccessories(false);
      });
  }, []);

  useEffect(() => {
    setIsLoadingPoducts(true);
    fetch('./api/products.json')
      .then(response => response.json())
      .then(setProducts)
      .catch(err => {
        throw new Error(err);
      })
      .finally(() => {
        setIsLoadingPoducts(false);
      });
  }, []);

  useEffect(() => {
    setIsLoadingPhones(true);
    fetch('./api/phones.json')
      .then(response => response.json())
      .then(setPhones)
      .catch(err => {
        throw new Error(err);
      })
      .finally(() => {
        setIsLoadingPhones(false);
      });
  }, []);

  useEffect(() => {
    setIsLoadingTablets(true);
    fetch('./api/tablets.json')
      .then(response => response.json())
      .then(setTablets)
      .catch(err => {
        throw new Error(err);
      })
      .finally(() => {
        setIsLoadingTablets(false);
      });
  }, []);

  return (
    <ContextApp.Provider
      value={{
        isLoadingAccessories,
        isLoadingPhones,
        isLoadingPoducts,
        isLoadingTablets,
        setIsLoadingAccessories,
        setIsLoadingPhones,
        setIsLoadingPoducts,
        setIsLoadingTablets,
        accessories,
        accessoriesTotalNumber,
        setAccessories,
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
