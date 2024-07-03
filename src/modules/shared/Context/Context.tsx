import React, { Dispatch, useEffect, useMemo, useState } from 'react';
import {
  URLSearchParamsInit,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import { getProducts } from '../../../services/products';
import { Product } from '../../../types/Product';
import { useLocalStorage } from '../../../hooks/UseLocalStorage';

type ProductContextType = {
  products: Product[];
  path: string;
  cart: Product[] | [];
  setLocalCart: Dispatch<React.SetStateAction<Product[] | []>>;
  favourite: Product[] | [];
  setLocalFavourite: Dispatch<React.SetStateAction<Product[] | []>>;
  isLoading: boolean;
  errorMessage: string;
  order: string;
  length: string;
  params: URLSearchParams;
  setSearchParams: (params: URLSearchParamsInit) => void;
  currentPage: number | string;
  query: string | null;
};

export const ProductContext = React.createContext<ProductContextType>({
  products: [],
  path: '',
  cart: [],
  setLocalCart: () => {},
  favourite: [],
  setLocalFavourite: () => {},
  isLoading: false,
  errorMessage: '',
  order: '',
  length: '',
  params: new URLSearchParams(),
  setSearchParams: () => {},
  currentPage: 1,
  query: '',
});

type Props = {
  children: React.ReactNode;
};

export const ProductProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[] | []>([]);
  const [cart, setCart] = useState<Product[] | []>([]);
  const [favourite, setFavourite] = useState<Product[] | []>([]);
  const path = useLocation().pathname;
  const [localCart, setLocalCart] = useLocalStorage<Product[]>('cart', cart);
  const [localFavourite, setLocalFavourite] = useLocalStorage<Product[]>(
    'favourite',
    favourite,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useMemo(() => {
    return new URLSearchParams(searchParams);
  }, [searchParams]);
  const order = searchParams.get('order') || 'Newest';
  const length = searchParams.get('length') || 'All';
  const currentPage = searchParams.get('page') || 1;
  const query = searchParams.get('query') || null;

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then(setProducts)
      .catch(() => setErrorMessage('Something wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setCart(localCart);
  }, [localCart]);

  useEffect(() => {
    setFavourite(localFavourite);
  }, [localFavourite]);

  const value = useMemo(
    () => ({
      products,
      path,
      cart,
      setLocalCart,
      favourite,
      setLocalFavourite,
      isLoading,
      errorMessage,
      query,
      order,
      length,
      params,
      setSearchParams,
      currentPage,
    }),
    [
      errorMessage,
      isLoading,
      products,
      path,
      cart,
      setLocalCart,
      favourite,
      setLocalFavourite,
      query,
      currentPage,
      order,
      length,
      setSearchParams,
      params,
    ],
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
