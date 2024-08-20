import { createContext, useEffect, useMemo, useState } from 'react';
import { Product } from '../types/Product';

export const FavouritesContext = createContext<{
  favourites: Product[];
  setFavourites: React.Dispatch<React.SetStateAction<Product[]>>;
}>({ favourites: [], setFavourites: () => {} });

type Props = {
  children: React.ReactNode;
};

export const FavouritesProvider: React.FC<Props> = ({ children }) => {
  const localFavourites = JSON.parse(
    localStorage.getItem('favourites') ?? JSON.stringify([]),
  );

  const [favourites, setFavourites] = useState<Product[]>(localFavourites);

  useEffect(() => {
    localStorage.setItem(
      'favourites',
      JSON.stringify(favourites) ?? JSON.stringify([]),
    );
  }, [favourites]);

  const value = useMemo(() => ({ favourites, setFavourites }), [favourites]);

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};
