import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Product } from '../types/Product';
import * as postServices from '../helpers/products';
import { useLocalStorage } from '../helpers/useLocalStorage';

type Context = {
  products: Product[],
  isLoading: boolean,
  errorMessage: string,
  path: string,
  cartIds: [string, number][],
  favIds: string[],
  addToCard: (id: string) => void,
  addToFavorite: (id: string) => void,
  increase: (id: string) => void,
  decrease: (id: string) => void,
  deleteId: (id: string) => void,
};

export const ProductsContext = React.createContext<Context>({
  products: [],
  isLoading: false,
  errorMessage: '',
  path: '',
  cartIds: [],
  favIds: [],
  addToCard: () => {},
  addToFavorite: () => {},
  increase: () => {},
  decrease: () => {},
  deleteId: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { pathname } = useLocation();
  const path = pathname.slice(1);

  function loadProducts() {
    setIsloading(true);

    return postServices.getProducts()
      .then(setProducts)
      .catch(() => {
        setErrorMessage('Unable to load Products');
        setTimeout(() => setErrorMessage(''), 3000);
      }).finally(() => setIsloading(false));
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const [cartIds, setCardIds] = useLocalStorage<[string, number][]>('card', []);
  const [favIds, setFavIds] = useLocalStorage<string[]>('favorite', []);

  function increase(prodId: string) {
    if (cartIds.some(arr => arr[0] === prodId)) {
      const iterable = cartIds.find(arr => arr[0] === prodId);

      if (iterable) {
        iterable[1] += 1;
        setCardIds([...cartIds.filter(id => id[0] !== prodId), iterable]);
      }
    }
  }

  function deleteId(prodId: string) {
    setCardIds([...cartIds.filter(id => id[0] !== prodId)]);
  }

  function addToCard(value: string) {
    if (cartIds.some(arr => arr[0] === value)) {
      increase(value);
    } else {
      setCardIds([...cartIds, [value, 1]]);
    }
  }

  function addToFavorite(value: string) {
    if (favIds.includes(value)) {
      setFavIds([...favIds.filter(id => id !== value)]);
    } else {
      setFavIds([...favIds, value]);
    }
  }

  function decrease(prodId: string) {
    if (cartIds.some(arr => arr[0] === prodId)) {
      const iterable = cartIds.find(arr => arr[0] === prodId);

      if (iterable) {
        iterable[1] -= 1;

        setCardIds(iterable[1] <= 0
          ? [...cartIds.filter(id => id[0] !== prodId)]
          : [...cartIds.filter(id => id[0] !== prodId), iterable]);
      }
    }
  }

  const value = useMemo(() => ({
    products,
    isLoading,
    errorMessage,
    path,
    cartIds,
    favIds,
    addToCard,
    addToFavorite,
    increase,
    decrease,
    deleteId,
  }), [products, isLoading, errorMessage, path, cartIds, favIds]);

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
