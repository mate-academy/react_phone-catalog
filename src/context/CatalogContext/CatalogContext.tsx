import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CatalogContextType } from './../../types/CatalogContextType';
import { Product, ProductForCart } from '../../types/types';
import { useLocalStorage } from '../../components/hooks/useLocaleStorage';
import { getProducts } from '../../api';

export const CatalogContext = React.createContext<CatalogContextType>({
  allProducts: [],
  favouriteProducts: [],
  cartProducts: [],
  addFavourites: () => {},
  deleteFavourites: () => {},
  addToCart: () => {},
  deleteFromCart: () => {},
  setCartProducts: () => {},
  navigationHistory: [],
  pushNavigationHistory: () => {},
  popNavigationHistory: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const CatalogProvider: React.FC<Props> = ({ children }) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [navigationHistory, setNavigationHistory] = useState<string[]>([]);

  useEffect(() => {
    getProducts().then(prod => setAllProducts(prod));
  }, []);

  const [favouriteProducts, setFavouriteProducts] = useLocalStorage<Product[]>(
    'Favourites',
    [],
  );
  const [cartProducts, setCartProducts] = useLocalStorage<ProductForCart[]>(
    'Cart',
    [],
  );

  const addFavourites = useCallback(
    (newFavourite: Product) => {
      setFavouriteProducts(currentFavourites => [
        ...currentFavourites,
        newFavourite,
      ]);
    },
    [setFavouriteProducts],
  );

  const deleteFavourites = useCallback(
    (favouriteIdToDelete: number) => {
      setFavouriteProducts(currentFavourites =>
        currentFavourites.filter(({ id }) => id !== favouriteIdToDelete),
      );
    },
    [setFavouriteProducts],
  );

  const addToCart = useCallback(
    (newProduct: Product): ProductForCart => {
      const productForCart: ProductForCart = { ...newProduct, quantity: 1 };

      setCartProducts(currentProducts => {
        return [...currentProducts, productForCart];
      });

      return productForCart;
    },
    [setCartProducts],
  );

  const deleteFromCart = useCallback(
    (favouriteIdToDelete: number) => {
      setCartProducts(currentFavourites =>
        currentFavourites.filter(({ id }) => id !== favouriteIdToDelete),
      );
    },
    [setCartProducts],
  );

  const pushNavigationHistory = useCallback((path: string) => {
    setNavigationHistory(prevHistory => [...prevHistory, path]);
  }, []);

  const popNavigationHistory = useCallback(() => {
    setNavigationHistory(prevHistory => prevHistory.slice(0, -1));
  }, []);

  const catalogValues = useMemo(
    () => ({
      allProducts,
      favouriteProducts,
      cartProducts,
      addFavourites,
      deleteFavourites,
      addToCart,
      deleteFromCart,
      setCartProducts,
      navigationHistory,
      pushNavigationHistory,
      popNavigationHistory,
    }),
    [
      allProducts,
      favouriteProducts,
      cartProducts,
      addFavourites,
      deleteFavourites,
      addToCart,
      deleteFromCart,
      setCartProducts,
      navigationHistory,
      pushNavigationHistory,
      popNavigationHistory,
    ],
  );

  return (
    <CatalogContext.Provider value={catalogValues}>
      {children}
    </CatalogContext.Provider>
  );
};
