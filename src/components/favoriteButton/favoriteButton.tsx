import './favoriteButton.scss';
import { useFavorites } from '../favoritesContext/favoritesContext';
import heartIcon from '../../images/heart-icon.png';
import fullHeartIcon from '../../images/full-heart-icon.png';

export const FavoriteButton = ({
  itemId: itemId,
  size = 40,
}: {
  itemId: string;
  size?: number;
}) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(itemId);

  return (
    <button
      className={`favorite__button ${isFavorite ? 'active' : ''}`}
      onClick={() => toggleFavorite(itemId)}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <img
        src={isFavorite ? fullHeartIcon : heartIcon}
        alt="Favorites"
        className="favorite__button--icon"
      />
    </button>
  );
};
