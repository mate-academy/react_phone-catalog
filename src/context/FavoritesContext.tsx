import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface FavoritesProviderProps {
  children: ReactNode;
}

interface FavItem {
  id: string;
}

interface FavoritesContext {
  toggleFavorite: (id: string) => void;
  favItems: FavItem[];
}

const FavoritesContext = createContext({} as FavoritesContext);

export function useFavorites() {
  return useContext(FavoritesContext);
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favItems, setFavItems] = useState<FavItem[]>(() => {
    const jsonValue = localStorage.getItem('favorites');
    if (jsonValue !== null) {
      return JSON.parse(jsonValue);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favItems));
  }, [favItems]);

  const toggleFavorite = (id: string) => {
    setFavItems(currentItems => {
      const isFavorite = currentItems.find(item => item.id === id);
      if (!isFavorite) {
        return [...currentItems, { id }];
      } else {
        return currentItems.filter(item => item.id !== id);
      }
    });
  };

  return (
    <FavoritesContext.Provider
      value={{
        toggleFavorite,
        favItems,
      }}>
      {children}
    </FavoritesContext.Provider>
  )
}
