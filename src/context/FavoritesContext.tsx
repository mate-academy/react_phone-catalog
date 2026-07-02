import { createContext, useContext, useState, useEffect } from 'react';

type FavoritesContextType = {
  favourites: string[];
  toggleFavourite: (id: string) => void;
};

type Props = {
  children: React.ReactNode;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const FavoritesProvider = ({ children }: Props) => {
  const [favourites, setFavourites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('favourites');

      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('favourites', JSON.stringify(favourites));
    } catch (err) {
      // console.error('Error saving to localStorage:', err);
    }
  }, [favourites]);

  const toggleFavourite = (id: string) => {
    setFavourites(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  };

  return (
    <FavoritesContext.Provider value={{ favourites, toggleFavourite }}>
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
