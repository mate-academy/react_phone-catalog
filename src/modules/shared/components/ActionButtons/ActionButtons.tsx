import React from 'react';
import classNames from 'classnames';
import styles from './ActionButtons.module.scss';
import { HeartIcon } from '../Icons';
import { Product } from '../../../../types/Product';
import { ProductDetails } from '../../../../types/ProductDetails';
import { useActionButtons } from './useActionButtons';

interface Props {
  product: Product | ProductDetails;
  size?: 'small' | 'large';
}

export const ActionButtons: React.FC<Props> = ({ product, size = 'small' }) => {
  const { isFavorite, isInCart, handleFavoriteClick, handleCartClick } =
    useActionButtons(product);

  return (
    <div className={classNames(styles.buttons, styles[size])}>
      <button
        type="button"
        className={classNames(styles.addToCart, {
          [styles.inCart]: isInCart,
        })}
        onClick={handleCartClick}
      >
        {isInCart ? 'Added' : 'Add to cart'}
      </button>

      <button
        type="button"
        className={classNames(styles.favorite, {
          [styles.favoriteActive]: isFavorite,
        })}
        onClick={handleFavoriteClick}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <HeartIcon isFilled={isFavorite} />
      </button>
    </div>
  );
};
