import React, { useState } from 'react';
import { Product } from '../types/Product';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { TotalCount } from '../types/TotalCount';

type ContextValue = {
  error: boolean,
  setError: (error: boolean) => void,
  products: Product[],
  setProducts: (products: Product[]) => void,
  favorietsList: string[],
  setFavorietsList: (v: string[]) => void,
  cardList: string[],
  setCardList: (v: string[]) => void,
  totalCount: TotalCount[],
  setTotalCount: (v: TotalCount[]) => void,
  totalNumber: number,
};

export const PageContext = React.createContext<ContextValue>({
  error: false,
  setError: () => {},
  products: [],
  setProducts: () => {},
  favorietsList: [],
  setFavorietsList: () => {},
  cardList: [],
  setCardList: () => {},
  totalCount: [],
  setTotalCount: () => {},
  totalNumber: 0,
});

type Props = {
  children: React.ReactNode,
};

export const GlobalProvider: React.FC<Props> = React.memo(({ children }) => {
  const [error, setError] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [favorietsList, setFavorietsList] = useLocalStorage('favoriets', []);
  const [cardList, setCardList] = useLocalStorage('card', []);

  const [totalCount, setTotalCount] = useState<TotalCount[]>([]);

  const getTotalNumber = () => {
    let result = 0;

    totalCount.forEach(el => {
      result += el.count;
    });

    return result;
  };

  const totalNumber = getTotalNumber();

  const providerValue = {
    error,
    setError,
    products,
    setProducts,
    favorietsList,
    setFavorietsList,
    cardList,
    setCardList,
    totalCount,
    setTotalCount,
    totalNumber,
  };

  return (
    <PageContext.Provider value={providerValue}>
      {children}
    </PageContext.Provider>
  );
});
