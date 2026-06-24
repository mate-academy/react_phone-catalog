import React from 'react';
import cn from 'classnames';

import { HeartIcon } from '../iconsSVG';
import styles from './ProductActions.module.scss';

interface Props {
  isInCart: boolean;
  isFavorited: boolean;
  onCartClick: () => void;
  onFavoriteClick: () => void;
}

export const ProductActions: React.FC<Props> = ({
  isInCart,
  isFavorited,
  onCartClick,
  onFavoriteClick,
}) => (
  <>
    <button
      type="button"
      className={cn(styles.productActions__cartButton, {
        [styles['productActions__cartButton--added']]: isInCart,
      })}
      onClick={onCartClick}
    >
      {isInCart ? 'Added to cart' : 'Add to cart'}
    </button>

    <button
      type="button"
      className={cn(styles.productActions__favoriteButton, {
        [styles['productActions__favoriteButton--selected']]: isFavorited,
      })}
      onClick={onFavoriteClick}
      aria-label="Toggle favorite"
      aria-pressed={isFavorited}
    >
      <HeartIcon filled={isFavorited} className={styles.productActions__icon} />
    </button>
  </>
);
