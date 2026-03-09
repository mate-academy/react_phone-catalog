import { useContext } from 'react';
import { FavouritesContext } from '../services/FavouritesContext';

export const useFavourites = (id: string | null) => {
  const { favourites, setFavourites } = useContext(FavouritesContext)!;

  const inFav = id ? favourites.includes(id) : false;

  const toggleFavourites = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!id) {
      return;
    }

    setFavourites(prev =>
      inFav ? prev.filter(el => el !== id) : [...prev, id],
    );
  };

  return { inFav, toggleFavourites };
};
