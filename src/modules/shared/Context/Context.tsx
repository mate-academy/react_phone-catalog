import React, { Dispatch, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
    ],
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
