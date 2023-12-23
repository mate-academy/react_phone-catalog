import React from 'react';
import cn from 'classnames';
import './AddToFavourites.scss';

type Props = {
  handleAddToFavourites: () => void,
  isItemFavourite: boolean,
};

export const AddToFavourites: React.FC<Props> = ({
  handleAddToFavourites,
  isItemFavourite,
}) => {
  return (
    <button
      type="button"
      aria-label="fav"
      onClick={handleAddToFavourites}
      data-cy="addToFavorite"
      className={cn('favourite', {
        isItemFavourite,
      })}
    >
      <div
        className={cn('favourite__heart', {
          'favourite__heart--active': isItemFavourite,
        })}
      />
    </button>
  );
};
