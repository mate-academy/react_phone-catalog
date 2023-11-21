import { useMemo } from 'react';
import cn from 'classnames';
import { Product } from '../../types/Product';
import { useFavourites } from '../../context/FavouritesContext';
import './FavouritesButton.scss';

type Props = {
  product: Product;
};

export const FavouritesButton: React.FC<Props> = ({ product }) => {
  const { favourites, setFavourites } = useFavourites();

  const isInFavourites = useMemo(() => {
    return !!favourites.find(favourite => favourite.id === product.id);
  }, [favourites]);

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isInFavourites) {
      setFavourites([...favourites, product]);
    } else {
      setFavourites(favourites
        .filter(favourite => favourite.id !== product.id));
    }
  };

  return (
    <button
      type="button"
      aria-label="Add to favourites"
      className={cn('FavouritesButton', {
        'FavouritesButton--selected': isInFavourites,
      })}
      onClick={handleLike}
      data-cy="addToFavorite"
    />
  );
};
