import { saveFavourites } from '../api/favourites';
import { useContext } from 'react';
import { FavouritesContext } from '../components/context/FavouritesContext';

export const useFavourite = (id: string | undefined) => {
  const context = useContext(FavouritesContext);

  if (!context) {
    throw new Error('useFavourite must be used inside FavouritesProvider');
  }

  const { favourites, setFavourites } = context;
  const isFavourites = id ? favourites.includes(id || '') : false;

  const handleAddToFavourites = () => {
    if (!id) {
      return;
    }

    if (favourites.includes(id)) {
      const updated = favourites.filter(favId => favId !== id);

      saveFavourites(updated);
      setFavourites(updated);
    } else {
      const updated = [...favourites, id];

      saveFavourites(updated);
      setFavourites(updated);
    }
  };

  return { isFavourites, handleAddToFavourites };
};
