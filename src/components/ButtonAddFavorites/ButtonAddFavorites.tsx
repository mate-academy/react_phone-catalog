import { useContext } from 'react';
import classNames from 'classnames';
import './style.scss';
import { Phone } from '../../types/Phone';
import { FavoritesContext } from '../../store/FavoritesContext';

type Props = {
  product: Phone;
  isInFavorites: boolean;
};

export const ButtonAddFavorites: React.FC<Props> = ({
  product, isInFavorites,
}) => {
  const { addToFavorites, deleteFavorites } = useContext(FavoritesContext);

  const handleClick = (item: Phone) => {
    if (isInFavorites) {
      deleteFavorites(item.id);
    } else {
      addToFavorites(item);
    }
  };

  return (
    <button
      aria-label="Add to favorites button"
      type="button"
      className={classNames('button-favoritesAdd', {
        'button-favoritesAdd--added': isInFavorites,
      })}
      onClick={() => handleClick(product)}
    >
      {isInFavorites ? (
        <img src="../icons/favoritesFilled.svg" alt="Favorites button" />
      ) : (
        <img src="../icons/favorites.svg" alt="Favorites button" />
      )}
    </button>

  );
};
