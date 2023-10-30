/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { getProducts } from '../utils/fetchClient';

type GlobalContextType = {
  products: Product[];
  errorMessage: boolean;
  localStore: Product[];
  isMobMenuVisible: boolean;
  setLocalStore: (v: Product[]) => void;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setIsMobMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

function useLocalStorage<T>(key: string, startValue: T): [T, (v: T) => void] {
  const [data, setData] = useState(() => {
    const dataFromStorage = localStorage.getItem(key);

    if (dataFromStorage === null) {
      return startValue;
    }

    try {
      return JSON.parse(dataFromStorage);
    } catch {
      return startValue;
    }
  });

  const save = (newData: T) => {
    localStorage.setItem(key, JSON.stringify(newData));
    setData(newData);
  };

  return [data, save];
}

export const GlobalContext = React.createContext<GlobalContextType>({
  products: [],
  errorMessage: false,
  localStore: [],
  isMobMenuVisible: false,
  setLocalStore: () => { },
  setProducts: () => { },
  setIsMobMenuVisible: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [localStore, setLocalStore] = useLocalStorage<Product[]>('cards', []);
  const [isMobMenuVisible, setIsMobMenuVisible] = useState<boolean>(false);

  useEffect(() => {
    if (errorMessage) {
      setErrorMessage(false);
    }

    (async () => {
      try {
        const productsFromApi: Product[] = await getProducts('products.json');
        const updatedProducts = productsFromApi.map(item => {
          const elem = localStore.find(e => item.id === e.id);

          if (elem) {
            return elem;
          }

          return {
            ...item,
            inFavourite: false,
            inCart: false,
            count: 1,
            totalAmount: item.price,
          };
        });

        setProducts(updatedProducts);
      } catch {
        setErrorMessage(true);
      }
    })();
  }, []);

  const value = {
    products,
    errorMessage,
    localStore,
    isMobMenuVisible,
    setLocalStore,
    setProducts,
    setIsMobMenuVisible,
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};
