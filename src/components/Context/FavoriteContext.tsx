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

const BASE = import.meta.env.BASE_URL;

const normalizeImg = (path: string) => {
  if (!path) {
    return '';
  }

  if (path.startsWith(BASE)) {
    return path;
  }

  return `${BASE}${path.startsWith('/') ? path.slice(1) : path}`;
};

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
    const normalizedItem: CardItem = {
      ...item,
      img: normalizeImg(item.img),
    };

    setFavorites(prev => {
      const exists = prev.some(fav => fav.id === normalizedItem.id);

      if (exists) {
        return prev.filter(fav => fav.id !== normalizedItem.id);
      }

      return [...prev, normalizedItem];
    });
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};
