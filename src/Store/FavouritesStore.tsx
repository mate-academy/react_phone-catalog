import { createContext, useMemo } from 'react';
import {
  LocalStorageKeys,
  UpdatedProduct,
} from '../modules/shared/Types/types';
import { useLocalStorage } from '../hooks/UseLocalStorageHook';

export const FavouritesContext = createContext({
  favourites: [],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setFavourites: (_newFavourites: UpdatedProduct[]) => {},
});

export const FavouritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favourites, setFavourites] = useLocalStorage<UpdatedProduct[]>(
    LocalStorageKeys.favorites,
    [],
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value = useMemo(() => ({ favourites, setFavourites }), [favourites]);

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};
