import React, { useCallback, useContext } from 'react';
import './BtnLike.scss';
import classNames from 'classnames';
import { icons } from '../../../../../global-assets/static';
import { FavesContext } from '../../../context/FavesContext';

type BtnLikeProps = {
  buttonSize: 'small' | 'medium';
  productId: string;
};

export const BtnLike: React.FC<BtnLikeProps> = React.memo(
  ({ buttonSize, productId }) => {
    const { favourites, setFavourites } = useContext(FavesContext);
    const IconLike = icons.like.valuePath;
    const IconLikeFill = icons.likeFill.valuePath;

    const handleFavesButton = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();

        if (favourites.includes(productId)) {
          const filteredFaves = favourites.filter(
            (prodItem: string) => prodItem !== productId,
          );

          setFavourites(filteredFaves);

          return;
        }

        setFavourites([...favourites, productId]);
      },
      [favourites, productId, setFavourites],
    );

    return (
      <button
        className={classNames('btn-like', {
          'btn-like--is-medium': buttonSize === 'medium',
        })}
        onClick={handleFavesButton}
      >
        <IconLike className="btn-like__image" />
        {favourites.includes(productId) && (
          <IconLikeFill className="btn-like__image btn-like__image--select" />
        )}
      </button>
    );
  },
);

BtnLike.displayName = 'BtnLike';
