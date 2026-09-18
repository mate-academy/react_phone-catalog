import React, { useState } from 'react';
import './FavoriteButton.scss';

import heartEmpty from '../../public/img/love.svg';
import heartFilled from '../../public/img/FavouritesFilled.svg';

interface FavoriteButtonProps {
  productId?: string;
  isInitiallyFavorite?: boolean;
  onToggle?: (isFav: boolean) => void;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isInitiallyFavorite = false,
  onToggle,
}) => {
  const [isFavorite, setIsFavorite] = useState(isInitiallyFavorite);

  const handleClick = () => {
    const nextState = !isFavorite;

    setIsFavorite(nextState);

    if (onToggle) {
      onToggle(nextState);
    }
  };

  return (
    <button
      type="button"
      className={`favorite-btn ${isFavorite ? 'favorite-btn--active' : ''}`}
      onClick={handleClick}
      aria-label="Add to favorites"
    >
      <img
        src={isFavorite ? heartFilled : heartEmpty}
        alt="Favorite icon"
        className="favorite-btn__icon"
      />
    </button>
  );
};
