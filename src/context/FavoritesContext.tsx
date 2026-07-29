import { createContext, useContext, useState, useEffect } from 'react';
type FavoritesContextType = {
  favorites: string[];
  toggleFavorite: (id: string) => void;
};
const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);
  const toggleFavorite = (id: string) => {
    setFavorites((prev: string[]) =>
      prev.includes(id) ? prev.filter((f: string) => f !== id) : [...prev, id],
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }

  return context;
};
