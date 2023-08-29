import {
  createContext, useContext, useMemo, useState,
} from 'react';
import { Product } from '../types/Phone';
import { LocaleDataTypes } from './localeStorage';

interface ContextProps {
  cartProducts: Product[];
  setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  totalAmountInCart: number;
  favoriteProducts: Product[];
  setFavoriteProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  totalAmountOfFavorites: number;
}

const ProductsContext = createContext({} as ContextProps);

export const useProductsContext = () => useContext(ProductsContext);

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const productsFromCart = localStorage.getItem(LocaleDataTypes.CART);
  const parsedProductsFromCart: Product[] = productsFromCart
    ? Object.values(JSON.parse(productsFromCart))
    : [];

  const productsFromFavorites = localStorage.getItem(LocaleDataTypes.FAVORITES);
  const parsedProductsFromFavorites: Product[] = productsFromFavorites
    ? Object.values(JSON.parse(productsFromFavorites))
    : [];

  const [cartProducts, setCartProducts] = useState<Product[]>(
    parsedProductsFromCart,
  );
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>(
    parsedProductsFromFavorites,
  );

  const totalAmountInCart: number = useMemo(
    () => cartProducts?.reduce((acc, product) => {
      return acc + product.amount;
    }, 0),
    [cartProducts],
  );

  const totalAmountOfFavorites: number = useMemo(
    () => favoriteProducts.length,
    [favoriteProducts.length],
  );

  return (
    <ProductsContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        totalAmountInCart,
        favoriteProducts,
        setFavoriteProducts,
        totalAmountOfFavorites,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
