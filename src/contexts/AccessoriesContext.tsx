import React, { useMemo, useState } from 'react';
import { Accessories } from '../types/AccessoriesType';

type AccessoriesContextType = {
  accessories: Accessories[];
  setAccessories: React.Dispatch<React.SetStateAction<Accessories[]>>;
};

export const AccessoriesContext = React.createContext<AccessoriesContextType>({
  accessories: [],
  setAccessories: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const AccessoriesProvider: React.FC<Props> = ({ children }) => {
  const [accessories, setAccessories] = useState<Accessories[]>([]);

  const value = useMemo(
    () => ({
      accessories,
      setAccessories,
    }),
    [accessories],
  );

  return (
    <AccessoriesContext.Provider value={value}>
      {children}
    </AccessoriesContext.Provider>
  );
};
