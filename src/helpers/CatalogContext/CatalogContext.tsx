import React, { useMemo, useState } from 'react';
import { Phone } from '../../Types/Phone';
import { useLocalStorage } from '../hooks/UseLocalStorage';

interface ICatalogContext {
  hotPricePhones: Phone[],
  setHotPriceProducts: (phonesFromServer: Phone[]) => void,
  newPhones: Phone[],
  setNewProducts: (phonesFromServer: Phone[]) => void,
  cartPhones: Phone[],
  setCartPhones: (newPhones: Phone[]) => void,
}

export const CatalogContext = React.createContext<ICatalogContext>({
  hotPricePhones: [],
  setHotPriceProducts: () => {},
  newPhones: [],
  setNewProducts: () => {},
  cartPhones: [],
  setCartPhones: () => {},
});

export const useProducts
  = (): ICatalogContext => React.useContext(CatalogContext);

type Props = {
  children: React.ReactNode;
};

export const CatalogProvider: React.FC<Props> = ({ children }) => {
  const [hotPricePhones, setHotPriceProducts] = useState<Phone[]>([]);
  const [newPhones, setNewProducts] = useState<Phone[]>([]);
  const [cartPhones, setCartPhones] = useLocalStorage<Phone[]>('cart', []);

  const value = useMemo(() => ({
    hotPricePhones,
    setHotPriceProducts,
    newPhones,
    setNewProducts,
    cartPhones,
    setCartPhones,
  }), [
    hotPricePhones,
    newPhones,
    cartPhones,
    setCartPhones,
  ]);

  return (
    <CatalogContext.Provider value={value}>
      {children}
    </CatalogContext.Provider>
  );
};
