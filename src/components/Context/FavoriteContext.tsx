import { createContext, useContext, useEffect, useState } from 'react';
import { CardItem } from '../../types/СardItem';

type FavoriteContextType = {
  favorites: CardItem[];
  toggleFavorite: (id: CardItem) => void;
};

const FavoriteContext = createContext<FavoriteContextType>({
  favorites: [],
  toggleFavorite: () => {},
});

export const useFavorites = () => useContext(FavoriteContext);

export const FavoriteProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavorites] = useState<CardItem[]>(() => {
    const stored = localStorage.getItem('favorites');

    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (item: CardItem) => {
    setFavorites(prev => {
      const exists = prev.some(fav => fav.id === item.id);

      if (exists) {
        return prev.filter(fav => fav.id !== item.id);
      }

      return [...prev, item];
    });
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};
