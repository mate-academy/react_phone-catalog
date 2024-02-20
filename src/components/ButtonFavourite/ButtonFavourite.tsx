// import { useState } from 'react';
import classNames from 'classnames';
import { useAppContext } from '../../store/AppContext';
import { Product } from '../../types/Product';
import './ButtonFavourite.scss';

type Props = {
  product: Product,
};

export const ButtonFovourite: React.FC<Props> = ({
  product,
}) => {
  const {
    state: { favourites },
    addToFavourites,
    removeFromFavourites,
  } = useAppContext();

  const isInFavourites = favourites
    .some(fav => fav.id === product.id);

  return (
    <button
      type="button"
      className={classNames('button-favourite', {
        'button-favourite--added-to-favourites': isInFavourites,
      })}
      onClick={(e) => {
        e.preventDefault();
        if (isInFavourites) {
          removeFromFavourites(product.id);
        } else {
          addToFavourites(product);
        }
      }}
      data-cy="addToFavorite"
    >
      <span
        className={classNames('button-favourite__icon', {
          'button-favourite__icon--added-to-favourites': isInFavourites,
        })}
      />
    </button>
  );
};
