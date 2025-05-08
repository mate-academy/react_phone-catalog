import React from 'react';
import styles from './Actions.module.scss';
import classNames from 'classnames';

type Props = {
  isInCart: boolean;
  isFavorite: boolean;
  toggleFavorite: () => void;
  toggleCart: () => void;
};

export const Actions: React.FC<Props> = ({
  isInCart,
  isFavorite,
  toggleFavorite,
  toggleCart,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleFavorite();
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleCart();
  };

  return (
    <div className={styles.actions}>
      <button
        className={classNames(styles.actions__addToCart, {
          [styles.actions__addToCartActive]: isInCart,
        })}
        onClick={handleAddToCartClick}
      >
        {isInCart ? 'Added' : 'Add to cart'}
      </button>
      <button
        onClick={handleClick}
        type="button"
        className={styles.actions__like}
      >
        {isFavorite ? (
          <img src="img/icons/favorites-full.svg" alt="Remove from favorites" />
        ) : (
          <img src="img/icons/favorites-empty.svg" alt="Add to favorites" />
        )}
      </button>
    </div>
  );
};
