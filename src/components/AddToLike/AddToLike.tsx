// components/AddToLike/AddToLike.tsx
import React from 'react';
import cn from 'classnames';
import { Product } from '../../types/Product';
import { useFavourites } from '../../context/FavouritesProvider';

import './AddToLike.scss';

type Props = {
  product: Product,
  styles: React.CSSProperties,
};

export const AddToLike: React.FC<Props> = ({ product, styles }) => {
  const { favourites, handleAddToFav } = useFavourites();
  const isProductFav = favourites.some((fav) => fav.id === product.id);

  return (
    <button
      data-cy="addToFavorite"
      type="button"
      className="AddToLike"
      style={styles}
      onClick={event => {
        event.preventDefault();
        handleAddToFav(product);
      }}
    >
      <div className={cn('icon__like', {
        'icon__like-noSelect': !isProductFav,
        'icon__like-selected': isProductFav,
      })}
      />
    </button>
  );
};
