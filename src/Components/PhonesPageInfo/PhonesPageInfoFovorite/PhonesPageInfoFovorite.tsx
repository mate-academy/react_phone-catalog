import { useState } from 'react';
import heartImage from './PhonesPageInfoFavoriteImages/heart.svg';
import './PhonesPageInfoFovorite.scss';

export const PhonesPageInfoFovorite = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = () => {
    setIsFavorite((prevState) => !prevState);
  };

  return (
    <div
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
