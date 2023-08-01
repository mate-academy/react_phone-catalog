import React from 'react';
import cn from 'classnames';

import favIcon from '../../images/heart.svg';
import favIconSelected from '../../images/heart-selected.svg';

import './AddToFavButton.scss';

type Props = {
  handleAddToFavorites: () => void;
  isItemFav: boolean;
};

export const AddToFavButton: React.FC<Props> = ({
  handleAddToFavorites,
  isItemFav,
}) => {
  return (
    <button
      type="button"
      className={cn('AddToFavButton', {
        isItemFav,
      })}
      onClick={handleAddToFavorites}
      data-cy="addToFavorite"
    >
      <img src={isItemFav ? favIconSelected : favIcon} alt="favIcon" />
    </button>
  );
};
