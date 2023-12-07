import React, { useMemo, useState } from 'react';
import { Phone } from '../../Types/Phone';

interface ICatalogContext {
  hotPricePhones: Phone[],
  setHotPriceProducts: (phonesFromServer: Phone[]) => void,
  newPhones: Phone[],
  setNewProducts: (phonesFromServer: Phone[]) => void,
  // cardsHeight: number,
  // setCardsHeight: (height: number) => void,
}

export const CatalogContext = React.createContext<ICatalogContext>({
  hotPricePhones: [],
  setHotPriceProducts: () => {},
  newPhones: [],
  setNewProducts: () => {},
  // cardsHeight: 576,
  // setCardsHeight: () => {},
});

export const useProducts
  = (): ICatalogContext => React.useContext(CatalogContext);

type Props = {
  children: React.ReactNode;
};

export const CatalogProvider: React.FC<Props> = ({ children }) => {
  const [hotPricePhones, setHotPriceProducts] = useState<Phone[]>([]);
  const [newPhones, setNewProducts] = useState<Phone[]>([]);
  // const [cardsHeight, setCardsHeight] = useState(576);

  const value = useMemo(() => ({
    hotPricePhones,
    setHotPriceProducts,
    newPhones,
    setNewProducts,
    // cardsHeight,
    // setCardsHeight,
  }), [
    hotPricePhones,
    newPhones,
    // cardsHeight,
  ]);

  return (
    <CatalogContext.Provider value={value}>
      {children}
    </CatalogContext.Provider>
  );
};
