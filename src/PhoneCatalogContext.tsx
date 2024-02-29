import React, { useEffect, useRef, useState } from 'react';
import { CardProduct, Product } from './types/Product';
import {
  getDataFromLocalStorage,
  setDataToLocalStorage,
} from './utils/LocalStorage';
import { Action } from './types/Status';

type Props = {
  children: React.ReactNode
};

interface Context {
  cart: CardProduct[];
  favorite: Product[];
  setCart: React.Dispatch<React.SetStateAction<CardProduct[]>>;
  setFavorite: React.Dispatch<React.SetStateAction<Product[]>>;
  selectedId: string | undefined;
  setSelectedId: React.Dispatch<React.SetStateAction<string | undefined>>;
  addToCart: (p: Product, event: React.MouseEvent) => void;
  isAdded: boolean;
  addToFavorite: (p: Product, event: React.MouseEvent) => void;
  handleQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  itemsPerPage: number;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const ContextValues: Context = {
  cart: [],
  favorite: [],
  setCart: () => { },
  setFavorite: () => { },
  selectedId: undefined,
  setSelectedId: () => { },
  addToCart: () => { },
  isAdded: false,
  addToFavorite: () => { },
  handleQueryChange: () => { },
  query: '',
  setQuery: () => { },
  sort: '',
  setSort: () => { },
  itemsPerPage: 4,
  setItemsPerPage: () => { },
  currentPage: 1,
  setCurrentPage: () => { },
};

export const PhoneCatalogContext = React.createContext<Context>(ContextValues);

export const PhoneCatalogProvider: React.FC<Props> = ({ children }) => {
  const [
    cart,
    setCart,
  ] = useState<CardProduct[]>(getDataFromLocalStorage('cart'));
  const [
    favorite,
    setFavorite,
  ] = useState<Product[]>(getDataFromLocalStorage('favorite'));

  const [sort, setSort] = useState<string>(Action.name);
  const [itemsPerPage, setItemsPerPage] = useState<number>(4);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  const [query, setQuery] = useState('');

  useEffect(() => {
    setDataToLocalStorage('cart', cart);
  }, [cart]);

  useEffect(() => {
    setDataToLocalStorage('favorite', favorite);
  }, [favorite]);

  const [isAdded, setIsAdded] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const addToCart = (p: Product, event: React.MouseEvent) => {
    const cartProduct: CardProduct = { ...p, quantity: 1 };
    const findItem = cart.find((item) => item.id === p.id);

    event.stopPropagation();

    if (findItem) {
      findItem.quantity += 1;
      setDataToLocalStorage('cart', cart);
    }

    if (!findItem) {
      setCart((prev) => [...prev, cartProduct]);
      setDataToLocalStorage('cart', cart);
    }

    setIsAdded(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const newTimeout = setTimeout(() => {
      setIsAdded(false);
    }, 1000);

    timeoutRef.current = newTimeout;
  };

  const addToFavorite = (p: Product, event: React.MouseEvent) => {
    event.stopPropagation();

    const isFavorite = favorite.some((favProduct) => favProduct.id === p.id);

    if (isFavorite) {
      setFavorite((prev) => prev
        .filter((favProduct) => favProduct.id !== p.id));
      setDataToLocalStorage('favorite', favorite);
    } else {
      setFavorite((prev) => [...prev, p]);
      setDataToLocalStorage('favorite', favorite);
    }
  };

  const handleQueryChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setQuery(e.target.value);
  };

  return (
    <PhoneCatalogContext.Provider value={{
      cart,
      favorite,
      setCart,
      setFavorite,
      selectedId,
      setSelectedId,
      addToCart,
      isAdded,
      addToFavorite,
      handleQueryChange,
      query,
      setQuery,
      sort,
      setSort,
      itemsPerPage,
      setItemsPerPage,
      currentPage,
      setCurrentPage,
    }}
    >
      {children}
    </PhoneCatalogContext.Provider>
  );
};
