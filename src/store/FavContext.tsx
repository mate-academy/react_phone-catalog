import React, { useState, useMemo } from 'react';
import { LSFav } from '../helpers/LSFav';

export const FavContext = React.createContext<{
  favQuantity: number;
  setFavQuantity: React.Dispatch<React.SetStateAction<number>>;
}>({
  favQuantity: 0,
  setFavQuantity: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const FavProvider: React.FC<Props> = ({ children }) => {
  const [favQuantity, setFavQuantity] = useState(LSFav.getTotalFavQuantity());

  const value = useMemo(
    () => ({
      favQuantity,
      setFavQuantity,
    }),
    [favQuantity],
  );

  return <FavContext.Provider value={value}>{children}</FavContext.Provider>;
};
