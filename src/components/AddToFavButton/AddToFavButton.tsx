/*  eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import cn from 'classnames';

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
    />
  );
};
