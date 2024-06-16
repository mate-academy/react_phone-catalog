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
  setAccessoriesTotalNumber: React.Dispatch<React.SetStateAction<number>>;
  setPhonesTotalNumber: React.Dispatch<React.SetStateAction<number>>;
  setProductsTotalNumber: React.Dispatch<React.SetStateAction<number>>;
  setTabletsTotalNumber: React.Dispatch<React.SetStateAction<number>>;
  cart: string[];
  fav: string[];
  setCart: React.Dispatch<React.SetStateAction<string[]>>;
  setFav: React.Dispatch<React.SetStateAction<string[]>>;
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
  const [accessoriesTotalNumber, setAccessoriesTotalNumber] = useState(0);
  const [phonesTotalNumber, setPhonesTotalNumber] = useState(0);
  const [productsTotalNumber, setProductsTotalNumber] = useState(0);
  const [tabletsTotalNumber, setTabletsTotalNumber] = useState(0);

  const [cart, setCart] = useState<string[]>(() => {
    const cart = localStorage.getItem('users');

    return cart ? JSON.parse(cart) : []
  }

  );
  const [fav, setFav] = useState<string[]>(() => {
    const fav = localStorage.getItem('fav');

    return fav ? JSON.parse(fav) : []
  });

  console.log('fav!!', fav);
  console.group('cart!!', cart);

  const location = useLocation();

  useEffect(() => {
    setIsLoadingPoducts(true);
    fetch('./api/products.json')
      .then(response => response.json())
      .then(response => {
        setProducts(response);
        setProductsTotalNumber(response.length);
      })
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
      .then(response => {
        setAccessories(response);
        setAccessoriesTotalNumber(response.length);
      })
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
      .then(response => {
        setPhones(response);
        setPhonesTotalNumber(response.length);
      })
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
      .then(response => {
        setTablets(response);
        setTabletsTotalNumber(response.length);
      })
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
        cart,
        fav,
        setCart,
        setFav,
        setAccessoriesTotalNumber,
        setPhonesTotalNumber,
        setProductsTotalNumber,
        setTabletsTotalNumber,
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
