import React, { useMemo, useState } from 'react';
import { parseStorage } from '../../Helpers/functions/storage-helpers';

type FavContextType = {
  fav: number,
  setFav: React.Dispatch<React.SetStateAction<number>>
};

export const FavContext = React.createContext<FavContextType>({
  fav: 0,
  setFav: () => {},
});

export const FavContextProvider:
React.FC<React.PropsWithChildren<React.ReactNode>>
= ({ children }) => {
  const parsedStorage = parseStorage('FavItems');
  const amount = parsedStorage.length;
  const [fav, setFav] = useState<number>(amount);
  const contextValue = useMemo(() => {
    return {
      fav,
      setFav,
    };
  }, [fav]);

  return (
    <FavContext.Provider value={contextValue}>
      {children}
    </FavContext.Provider>
  );
};
