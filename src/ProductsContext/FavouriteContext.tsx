import {
  ReactNode,
  useContext,
  createContext,
  useEffect,
  useState,
} from 'react';

type FavouriteContextType = {
  favourites: number[];
  toggleFavourite: (id: number) => void;
};

export const FavouriteContext = createContext<FavouriteContextType>({
  favourites: [],
  toggleFavourite: () => {},
});

export const FavouriteProvider = ({ children }: { children: ReactNode }) => {
  const [favourites, setFavourites] = useState<number[]>([]);

  const toggleFavourite = (id: number) => {
    setFavourites(prev => {
      const newFavourites = prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id];

      localStorage.setItem('favourites', JSON.stringify(newFavourites));

      return newFavourites;
    });
  };

  useEffect(() => {
    const isSaved = localStorage.getItem('favourites');

    if (isSaved) {
      try {
        const parsed = JSON.parse(isSaved);

        if (Array.isArray(parsed) && parsed.every(i => typeof i === 'number')) {
          setFavourites(parsed);
        } else {
          setFavourites([]);
        }
      } catch {
        setFavourites([]);
      }
    }
  }, []);

  return (
    <FavouriteContext.Provider value={{ favourites, toggleFavourite }}>
      {children}
    </FavouriteContext.Provider>
  );
};

export const useFavourite = () => useContext(FavouriteContext);
