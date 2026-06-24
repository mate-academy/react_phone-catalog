import React, { useEffect, useMemo, useState } from 'react';
import { ProductCardItem } from '../../types/CartItem';

type FavouritesContextType = {
  favourites: ProductCardItem[];
  setFavourites: React.Dispatch<React.SetStateAction<ProductCardItem[]>>;
};

export const FavouritesContext = React.createContext<FavouritesContextType>({
  favourites: [],
  setFavourites: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const FavouritesProvider: React.FC<Props> = ({ children }) => {
  const [favourites, setFavourites] = useState<ProductCardItem[]>(() => {
    const savedFav = localStorage.getItem('favourites');

    return savedFav ? JSON.parse(savedFav) : [];
  });

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const value = useMemo(
    () => ({
      favourites,
      setFavourites,
    }),
    [favourites],
  );

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};
