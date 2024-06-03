import { createContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Product } from '../types/ProductCard';
import { Favorites } from '../types/Favorites';

type FavoritesContextType = {
  favoriteProducts: Favorites;
  setFavoriteProducts: React.Dispatch<React.SetStateAction<Favorites>>;
  addToFavorites: (newFavoriteProduct: Product) => void;
};

export const FavoritesContext = createContext<FavoritesContextType>({
  favoriteProducts: [],
  setFavoriteProducts: () => {},
  addToFavorites: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const FavoritesProvider: React.FC<Props> = ({ children }) => {
  const [favoriteProducts, setFavoriteProducts] = useLocalStorage(
    'favoriteProducts',
    [] as Favorites,
  );

  const addToFavorites = (newFavoriteProduct: Product) => {
    if (
      favoriteProducts.some(
        (prod: Product) => prod.id === newFavoriteProduct.id,
      )
    ) {
      setFavoriteProducts((currentFavorites: Favorites) => {
        return currentFavorites.filter(
          (prod: Product) => prod.id !== newFavoriteProduct.id,
        );
      });
    } else {
      setFavoriteProducts((currentFavorites: Favorites) => [
        ...currentFavorites,
        newFavoriteProduct,
      ]);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{ favoriteProducts, setFavoriteProducts, addToFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
