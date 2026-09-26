import { createContext, useEffect, useState } from 'react';
import { getFavourites } from '../../api/favourites';

type FavouriteContextType = {
  favourites: string[];
  setFavourites: React.Dispatch<React.SetStateAction<string[]>>;
};

export const FavouritesContext = createContext<FavouriteContextType | null>(
  null,
);

type Props = {
  children: React.ReactNode;
};

export const FavouritesProvider = ({ children }: Props) => {
  const [favourites, setFavourites] = useState<string[]>([]);

  useEffect(() => {
    const storedFavourites = getFavourites();

    setFavourites(storedFavourites);
  }, []);

  return (
    <FavouritesContext.Provider value={{ favourites, setFavourites }}>
      {children}
    </FavouritesContext.Provider>
  );
};
