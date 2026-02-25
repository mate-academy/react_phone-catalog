/* eslint-disable max-len */
import React from 'react';

import favouriteSelected from '../../../assets/icons/favourites-filled-heart-like.svg';

interface FavouriteIconProps {
  className: string;
}

export const FavouriteIconSelected: React.FC<FavouriteIconProps> = ({
  className,
}) => {
  return (
    <img
      src={favouriteSelected}
      alt="Favourite selected"
      className={className}
    />
  );
};
