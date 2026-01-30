import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

const empty: Product[] = [];

interface FavoritesContextProps {
  favorites: Product[] | null;
  setFavorites: Dispatch<SetStateAction<Product[]>> | null;
  toggleFavorites: null | ((product: Product | null) => void);
  isFavorited: null | ((product: Product | null) => boolean);
}

const FavoritesContext = createContext<FavoritesContextProps>({
  favorites: null,
  setFavorites: null,
  toggleFavorites: null,
  isFavorited: null,
});

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState(() => {
    const favoritesJson = localStorage.getItem('favorites');

    if (favoritesJson) {
      return JSON.parse(favoritesJson) as Product[];
    }

    return empty;
  });

  localStorage.setItem('favorites', JSON.stringify(favorites));

  const toggleFavorites = (product: Product | null) => {
    if (!product || !toggleFavorites) {
      return;
    }

    return setFavorites(cur => {
      if (cur.some(elem => elem.id === product.id)) {
        return cur.filter(elem => elem.id !== product.id);
      }

      return [...cur, product];
    });
  };

  const isFavorited = (product: Product | null) => {
    return favorites?.some(elem => elem.id === product?.id);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, setFavorites, toggleFavorites, isFavorited }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
