import { createContext, useEffect, useState } from 'react';

type FavoritesContextType = {
  favoritesIds: string[];
  setFavoritesIds: (favoritesIds: string[]) => void;
  addFavoriteId: (id: string) => void;
  totalItemsOfFavorites: number;
};

export const FavoritesContext = createContext<FavoritesContextType>({
  favoritesIds: [],
  setFavoritesIds: () => {},
  addFavoriteId: () => {},
  totalItemsOfFavorites: 0,
});

type Props = {
  children: React.ReactNode;
};

export const FavoritesProvider: React.FC<Props> = ({ children }) => {
  const [favoritesIds, setFavoritesIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('favoritesIds');

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favoritesIds', JSON.stringify(favoritesIds));
  }, [favoritesIds]);

  const value = {
    favoritesIds,
    setFavoritesIds,
    addFavoriteId: (id: string) => {
      if (favoritesIds.includes(id)) {
        return setFavoritesIds(
          favoritesIds.filter(favorite => favorite !== id),
        );
      }

      return setFavoritesIds([...favoritesIds, id]);
    },
    totalItemsOfFavorites: favoritesIds.length,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
