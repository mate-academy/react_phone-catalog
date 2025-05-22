import React, { memo } from 'react';
import { ICON_DATA_PATHS } from '../../constants/iconDataPaths';
import addToFavoritesButton from './AddToFavoritesButton.module.scss';
import { IconButton } from '../IconButton/IconButton';
import classNames from 'classnames';
import { useFavorites } from '../../context/FavoriteContext';

type Props = {
  className?: string;
  itemId: string;
};

export const AddToFavoritesButton: React.FC<Props> = memo(
  ({ className, itemId }) => {
    const { favorites, toggleProductInFavorite } = useFavorites();
    const isInFavorites = favorites.includes(itemId);

    return (
      <IconButton
        iconDataPath={
          isInFavorites
            ? ICON_DATA_PATHS.FAVORITES.FILLED
            : ICON_DATA_PATHS.FAVORITES.OUTLINE
        }
        className={addToFavoritesButton.addToFavoritesButton}
        iconClassName={classNames(
          className,
          addToFavoritesButton.addToFavoritesButton__icon,
          {
            [addToFavoritesButton['addToFavoritesButton__icon--select']]:
              isInFavorites,
          },
        )}
        onClick={() => toggleProductInFavorite(itemId)}
      />
    );
  },
);

AddToFavoritesButton.displayName = 'AddToFavoritesButton';
