import { useEffect, useState } from 'react';
import { FavoritesContext } from './FavoritesContext';

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favoritesItemsIds, setFavoritesItemsIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('favoriteItems');

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favoriteItems', JSON.stringify(favoritesItemsIds));
  }, [favoritesItemsIds]);

  const toggleFavorite = (itemId: string) => {
    setFavoritesItemsIds(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId],
    );
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoritesItemsIds,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
