import React, { useEffect, useRef, useState } from 'react';
import { Product } from '../types/Product';
import { Item } from '../types/Item';
import { useLocation } from 'react-router-dom';

type AppContextProps = {
  app: React.RefObject<HTMLDivElement>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  products: Product[];
  productsTotalNumber: number;
  phonesTotalNumber: number;
  phones: Item[];
  setPhones: React.Dispatch<React.SetStateAction<Item[]>>;
  tablets: Item[];
  setTablets: React.Dispatch<React.SetStateAction<Item[]>>;
  tabletsTotalNumber: number;
  accessoriesTotalNumber: number;
  accessories: Item[];
  setAccessories: React.Dispatch<React.SetStateAction<Item[]>>;
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
  const [phones, setPhones] = useState<Item[]>([]);
  const [tablets, setTablets] = useState<Item[]>([]);
  const [accessories, setAccessories] = useState<Item[]>([]);
  const [isLoadingPoducts, setIsLoadingPoducts] = useState(true);
  const [isLoadingPhones, setIsLoadingPhones] = useState(true);
  const [isLoadingTablets, setIsLoadingTablets] = useState(true);
  const [isLoadingAccessories, setIsLoadingAccessories] = useState(false);
  const accessoriesTotalNumber = accessories.length;
  const phonesTotalNumber = phones.length;
  const productsTotalNumber = products.length;
  const tabletsTotalNumber = tablets.length;

  const location = useLocation();

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
  }, [location.pathname]);

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
  }, [location.pathname]);

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
  }, [location.pathname]);

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
  }, [location.pathname]);

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
