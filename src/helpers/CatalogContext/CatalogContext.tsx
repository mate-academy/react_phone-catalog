import React, { useMemo, useState } from 'react';
import { Phone } from '../../Types/Phone';
import { useLocalStorage } from '../hooks/UseLocalStorage';
import { CartPhone } from '../../Types/CartPhone';

interface ICatalogContext {
  hotPricePhones: Phone[],
  setHotPriceProducts: (phonesFromServer: Phone[]) => void,
  newPhones: Phone[],
  setNewProducts: (phonesFromServer: Phone[]) => void,
  cartPhones: CartPhone[],
  setCartPhones: (newPhones: CartPhone[]) => void,
  favourites: Phone[],
  setFavourites: (newFavourites: Phone[]) => void,
}

export const CatalogContext = React.createContext<ICatalogContext>({
  hotPricePhones: [],
  setHotPriceProducts: () => { },
  newPhones: [],
  setNewProducts: () => { },
  cartPhones: [],
  setCartPhones: () => { },
  favourites: [],
  setFavourites: () => { },
});

export const useProducts
  = (): ICatalogContext => React.useContext(CatalogContext);

type Props = {
  children: React.ReactNode;
};

export const CatalogProvider: React.FC<Props> = ({ children }) => {
  const [hotPricePhones, setHotPriceProducts] = useState<Phone[]>([]);
  const [newPhones, setNewProducts] = useState<Phone[]>([]);
  const [cartPhones, setCartPhones] = useLocalStorage<CartPhone[]>('cart', []);
  const [favourites, setFavourites] = useLocalStorage<Phone[]>(
    'favourites', [],
  );

  const value = useMemo(() => ({
    hotPricePhones,
    setHotPriceProducts,
    newPhones,
    setNewProducts,
    cartPhones,
    setCartPhones,
    favourites,
    setFavourites,
  }), [
    hotPricePhones,
    newPhones,
    cartPhones,
    setCartPhones,
    favourites,
    setFavourites,
  ]);

  return (
    <CatalogContext.Provider value={value}>
      {children}
    </CatalogContext.Provider>
  );
};
