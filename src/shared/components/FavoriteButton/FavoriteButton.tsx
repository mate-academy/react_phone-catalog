import { IconButton } from '@/shared/components/IconButton';
import { useFavoritesDispatch } from '@/shared/hooks/useFavoritesDispatch';
import { useFavoritesState } from '@/shared/hooks/useFavoritesState';

interface Props {
  id: number;
  className?: string;
  size?: 's' | 'm';
}

export const FavoriteButton = ({ id, className, size = 's' }: Props) => {
  const favoritesDispatch = useFavoritesDispatch();
  const favoritesState = useFavoritesState();

  const handleToggleFavorite = () => {
    favoritesDispatch(currentFavorites => {
      if (currentFavorites.includes(id)) {
        return currentFavorites.filter(favorite => favorite !== id);
      }

      return [...currentFavorites, id];
    });
  };

  return (
    <IconButton
      variant="favorite"
      className={className}
      onClick={handleToggleFavorite}
      selected={favoritesState.includes(id)}
      size={size}
    />
  );
};
