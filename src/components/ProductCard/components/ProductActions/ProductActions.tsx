import React from 'react';
import { Button } from '../../../Button';
import { Icon } from '../../../Icon';
import styles from './ProductActions.module.scss';

interface Props {
  isInCart: boolean;
  isInFavorites: boolean;
  handleCartAction: () => void;
  handleFavoritesAction: () => void;
}

export const ProductActions: React.FC<Props> = ({
  isInCart,
  isInFavorites,
  handleCartAction,
  handleFavoritesAction,
}) => {
  return (
    <div className={styles.actions}>
      <Button variant="primary" selected={isInCart} onClick={handleCartAction}>
        {isInCart ? 'Added' : 'Add to cart'}
      </Button>
      <Button variant="favorite" selected={isInFavorites} onClick={handleFavoritesAction}>
        <Icon variant="heart" selected={isInFavorites} />
      </Button>
    </div>
  );
};
