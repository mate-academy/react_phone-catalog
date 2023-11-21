import React, { useMemo, useState } from 'react';
import { Phone } from '../../Types/Phone';
// import { useLocalStorage } from '../hooks/UseLocalStorage';

interface ICatalogContext {
  phones: Phone[],
  setPhones: (phonesFromServer: Phone[]) => void,
}

export const CatalogContext = React.createContext<ICatalogContext>({
  phones: [],
  setPhones: () => {},
});

export const useProducts
  = (): ICatalogContext => React.useContext(CatalogContext);

type Props = {
  children: React.ReactNode;
};

export const CatalogProvider: React.FC<Props> = ({ children }) => {
  const [phones, setPhones] = useState<Phone[]>([]);

  const value = useMemo(() => ({
    phones,
    setPhones,
  }), [
    phones,
  ]);

  return (
    <CatalogContext.Provider value={value}>
      {children}
    </CatalogContext.Provider>
  );
};
