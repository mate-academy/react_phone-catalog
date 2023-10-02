import React from 'react';
import cn from 'classnames';
import './AddToFavourite.scss';

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
    />
  );
};
