import React, { useMemo, useState } from 'react';

type FavContextType = {
  fav: number,
  setFav: React.Dispatch<React.SetStateAction<number>>
};

type Props = {
  children: React.ReactNode,
};

export const FavContext = React.createContext<FavContextType>({
  fav: 0,
  setFav: () => {},
});

export const FavContextProvider: React.FC<Props> = ({ children }) => {
  const storage = localStorage.getItem('FavItems');
  const parsedStorage = storage
    ? JSON.parse(storage)
    : [];

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
