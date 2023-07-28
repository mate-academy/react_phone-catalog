import { useFavoriteContext }
  from '../../../core/context/FavoriteContext/FavoriteContext';
import heartImage from './PhonesPageInfoFavoriteImages/heart.svg';
import './PhonesPageInfoFovorite.scss';

interface Info {
  id: string;
}

interface InfoProps {
  info: Info;
}

export const PhonesPageInfoFovorite = ({ info }: InfoProps) => {
  const { id } = info;

  const {
    favorites,
    addToFavorites,
    removeFromFavorites,
  } = useFavoriteContext();

  const isFavorite = favorites.includes(id.toString());

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(id.toString());
    } else {
      addToFavorites(id.toString());
    }
  };

  return (
    <div
      data-cy="addToFavorite"
      className={`hear-image-card ${isFavorite ? 'is-activeButton' : ''
      }`}
      onClick={handleToggleFavorite}
      onKeyDown={handleToggleFavorite}
      role="button"
      tabIndex={0}
    >
      <img
        src={heartImage}
        className="heard-cardr"
        alt="card-heart"
      />
    </div>
  );
};
