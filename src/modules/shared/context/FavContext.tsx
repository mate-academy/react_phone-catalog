import React, { useEffect, useMemo, useState } from 'react';
import { useSavedItems } from '../hooks/useSavedItems';
import { Product } from '../types/Product';
import { getProducts } from '../utils/fetchClient';

type FavContextValue = {
  favouritesIds: string[];
  setFavouritesIds: (v: string[]) => void;
  favouritesProducts: Product[];
};

export const FavContext = React.createContext<FavContextValue>({
  favouritesIds: [],
  setFavouritesIds: () => {},
  favouritesProducts: [],
});

type Props = { children: React.ReactNode };

export const FavItemsProvider: React.FC<Props> = ({ children }) => {
  const [favouritesIds, setFavouritesIds] = useSavedItems<string[]>(
    'favourites',
    [],
  );

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts<Product[]>('/api/products.json').then(productsFromServer => {
      setProducts(productsFromServer);
    });
  }, []);

  const favouritesProducts = useMemo(() => {
    if (!favouritesIds || products.length === 0) {
      return [];
    }

    return products.filter(p => favouritesIds.includes(p.itemId));
  }, [favouritesIds, products]);

  const value = useMemo(
    () => ({
      favouritesIds,
      setFavouritesIds,
      favouritesProducts,
    }),
    [favouritesIds, favouritesProducts],
  );

  return <FavContext.Provider value={value}>{children}</FavContext.Provider>;
};
