import React from 'react';
import classNames from 'classnames';
import { Product } from '../../../api/products';
import { useFavorites } from '../../../modules/shared/context/FavoritesContext';
import HeartActive from '/icons/favourites-heart-like-active.svg';
import Heart from '/icons/favourites-heart-like.svg';
import styles from './FavoriteBtn.module.scss';

interface Props {
  product: Product;
  className?: string;
}

export const FavoriteBtn: React.FC<Props> = ({ product, className }) => {
  const { items, toggle } = useFavorites();
  const inFav = items.some(i => i.id === product.id);

  return (
    <button
      type="button"
      onClick={() => toggle(product)}
      className={classNames(styles.favoriteBtn, className, {
        [styles['favoriteBtn--active']]: inFav,
      })}
      aria-pressed={inFav}
      aria-label={inFav ? 'Remove from favorites' : 'Add to favorites'}
    >
      <img src={inFav ? HeartActive : Heart} alt="" />
    </button>
  );
};
