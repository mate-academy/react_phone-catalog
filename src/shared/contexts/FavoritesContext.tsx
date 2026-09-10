import { createContext, useEffect, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

type FavoritesState = number[] | null;
type FavoritesDispatch =
  | null
  | ((value: number[] | ((prevState: number[]) => number[])) => void);

export const FavoritesStateContext = createContext<FavoritesState>(null);
export const FavoritesDispatchContext = createContext<FavoritesDispatch>(null);

export const FavoritesProvider = ({ children }: Props) => {
  const [favoriteProducts, setFavoriteProducts] = useState<number[]>(() => {
    const storedFavorites = localStorage.getItem('favorites');

    if (!storedFavorites) {
      return [];
    }

    try {
      return JSON.parse(storedFavorites);
    } catch {
      localStorage.removeItem('favorites');

      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favoriteProducts));
  }, [favoriteProducts]);

  return (
    <FavoritesStateContext.Provider value={favoriteProducts}>
      <FavoritesDispatchContext.Provider value={setFavoriteProducts}>
        {children}
      </FavoritesDispatchContext.Provider>
    </FavoritesStateContext.Provider>
  );
};
