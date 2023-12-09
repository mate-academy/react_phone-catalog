import React, { useMemo, useState } from 'react';
import { Phone } from '../../Types/Phone';

interface ICatalogContext {
  hotPricePhones: Phone[],
  setHotPriceProducts: (phonesFromServer: Phone[]) => void,
  newPhones: Phone[],
  setNewProducts: (phonesFromServer: Phone[]) => void,
}

export const CatalogContext = React.createContext<ICatalogContext>({
  hotPricePhones: [],
  setHotPriceProducts: () => {},
  newPhones: [],
  setNewProducts: () => {},
});

export const useProducts
  = (): ICatalogContext => React.useContext(CatalogContext);

type Props = {
  children: React.ReactNode;
};

export const CatalogProvider: React.FC<Props> = ({ children }) => {
  const [hotPricePhones, setHotPriceProducts] = useState<Phone[]>([]);
  const [newPhones, setNewProducts] = useState<Phone[]>([]);

  const value = useMemo(() => ({
    hotPricePhones,
    setHotPriceProducts,
    newPhones,
    setNewProducts,
  }), [
    hotPricePhones,
    newPhones,
  ]);

  return (
    <CatalogContext.Provider value={value}>
      {children}
    </CatalogContext.Provider>
  );
};
