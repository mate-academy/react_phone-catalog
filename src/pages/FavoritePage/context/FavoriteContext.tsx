import { createContext, useContext, useState } from 'react';
import { BaseProduct } from '../../../types/BaseProduct';

type FavoriteType = {
  favoriteItems: BaseProduct[];
  addToFavorite: (item: BaseProduct) => void;
  removeFromFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

const FavoriteContext = createContext<FavoriteType | null>(null);

export const FavoriteProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favoriteItems, setFavoriteItems] = useState<BaseProduct[]>(() => {
    const saved = localStorage.getItem('favoriteItems');

    return saved ? JSON.parse(saved) : [];
  });

  const addToFavorite = (item: BaseProduct) => {
    const newItems = [...favoriteItems, { ...item, id: item.itemId }];

    setFavoriteItems(newItems);
    localStorage.setItem('favoriteItems', JSON.stringify(newItems));
  };

  const removeFromFavorite = (id: string) => {
    const itemForDelete = favoriteItems.filter(item => String(item.id) !== id);

    setFavoriteItems(itemForDelete);
    localStorage.setItem('favoriteItems', JSON.stringify(itemForDelete));
  };

  const isFavorite = (id: string) => {
    return favoriteItems.some(item => String(item.id) === id);
  };

  return (
    <FavoriteContext.Provider
      value={{ favoriteItems, addToFavorite, removeFromFavorite, isFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => {
  const context = useContext(FavoriteContext);

  if (!context) {
    throw new Error('useCart must be used within FavoriteProvider');
  }

  return context;
};
