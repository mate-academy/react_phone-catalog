/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Product } from './types/Product';
import { ContextType } from './types/ContextType';
import { getProducts } from './utils/api-phones';
import { useLocalStorage } from './utils/useLocalStorage';

// export function useLocalStorage<T>(
//   key: string,
//   startValue: T,
// ): [T, (value: T) => void] {
//   const [data, setData] = useState(() => {
//     const dataFromStorage = localStorage.getItem(key);

//     if (dataFromStorage === null) {
//       return startValue;
//     }

//     try {
//       return JSON.parse(dataFromStorage);
//     } catch {
//       return startValue;
//     }
//   });

//   const save = (newData: T) => {
//     localStorage.setItem(key, JSON.stringify(newData));
//     setData(newData);
//   };

//   return [data, save];
// }

export const GlobalContext = React.createContext<ContextType>({
  products: [],
  phones: [],
  tablets: [],
  accessories: [],
  setProducts: () => { },
  setIsLoading: () => { },
  getNewPathname: () => '',
  addRemoveFavList: () => { },
  favList: [],
  isLoading: false,
});

type Props = {
  children: React.ReactNode;
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const { pathname } = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // const [localStorage, setLocalStorage] = useLocalStorage<Product[]>(
  //   'cards',
  //   [],
  // );

  // const [localStorage, setLocalStorage] = useLocalStorage<Product[]>('crd', []);
  const [favList, setFavList] = useLocalStorage<Product[]>('fav', []);

  // console.log(favList);

  const phones = products.filter(item => item.category === 'phones');
  const tablets = products.filter(item => item.category === 'tablets');
  const accessories = products.filter(item => item.category === 'accessories');

  function addRemoveFavList(product: Product): void {
    favList.find(fav => fav.id === product.id)
      ? setFavList([...favList].filter(item => item.id !== product.id))
      : setFavList([...favList, product]);
  }

  function getNewPathname(option: string, index: number): string {
    const pathnameArr = pathname.split('-');

    pathnameArr.splice(index, 1, option).join('-');

    return pathnameArr.join('-');
  }

  useEffect(() => {
    setIsLoading(true);

    getProducts()
      .then(setProducts)
      .catch(() => {
        return 'Error';
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const value = {
    products,
    phones,
    tablets,
    accessories,
    setProducts,
    getNewPathname,
    addRemoveFavList,
    favList,
    isLoading,
    setIsLoading,
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};
