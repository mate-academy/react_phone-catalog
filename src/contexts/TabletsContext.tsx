import React, { useMemo, useState } from 'react';
import { Tablet } from '../types/TabletType';

type TabletContextType = {
  tablets: Tablet[];
  setTablets: React.Dispatch<React.SetStateAction<Tablet[]>>;
};

export const TabletContext = React.createContext<TabletContextType>({
  tablets: [],
  setTablets: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TabletProvider: React.FC<Props> = ({ children }) => {
  const [tablets, setTablets] = useState<Tablet[]>([]);

  const value = useMemo(
    () => ({
      tablets,
      setTablets,
    }),
    [tablets],
  );

  return (
    <TabletContext.Provider value={value}>{children}</TabletContext.Provider>
  );
};
