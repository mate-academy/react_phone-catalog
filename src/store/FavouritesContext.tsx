import React, { useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from '../modules/hooks/useLocalStorage';
import { FavItem } from '../types/FavItem';
import { Product } from '../types/Product';
import { PRODUCT_URL } from "../modules/constants/URL's/URL's";
import { client } from '../api';

type ContextType = {
  favouritesList: FavItem[];
  setFavouritesList: React.Dispatch<FavItem[]>;
  products: Product[];
  dataLoaded: boolean;
  setProducts: React.Dispatch<Product[]>;
};

export const FavoutitesContext = React.createContext<ContextType>({
  favouritesList: [],
  setFavouritesList: () => {},
  products: [],
  dataLoaded: false,
  setProducts: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const FavouritesProvider: React.FC<Props> = ({ children }) => {
  const [favouritesList, setFavouritesList] = useLocalStorage<FavItem[]>(
    'favItem',
    [],
  );

  const [products, setProducts] = useState<Product[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (favouritesList.length !== products.length) {
      setDataLoaded(false);

      client
        .get<Product[]>(PRODUCT_URL)
        .then(data => {
          const favProducts = favouritesList.reduce<Product[]>(
            (acc, product) => {
              const device = data.find(item => product.itemId === item.itemId);

              if (device) {
                acc.push(device);
              }

              return acc;
            },
            [],
          );

          setProducts(favProducts);
          setDataLoaded(true);
        })
        .catch(() => {}); // setError
    }
  }, [favouritesList, products.length]);

  const value = useMemo(
    () => ({
      favouritesList,
      setFavouritesList,
      products,
      dataLoaded,
      setProducts,
    }),
    [favouritesList, setFavouritesList, products, dataLoaded],
  );

  return (
    <FavoutitesContext.Provider value={value}>
      {children}
    </FavoutitesContext.Provider>
  );
};
