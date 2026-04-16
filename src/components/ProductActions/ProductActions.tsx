import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './ProductActions.module.scss';

import { ProductType } from '../../types/product.types';
import { useCart } from '../../hooks/useCart';
import { useFavorites } from '../../hooks/useFavorites';
import { HeartIcon } from '../HeartIcon';
import { Button } from '../Button';
import classNames from 'classnames';

interface ProductActionsProps {
  product: ProductType;
  variant?: 'card' | 'details';
  className: string;
}

export const ProductActions: React.FC<ProductActionsProps> = ({
  product,
  variant = 'card',
  className,
}) => {
  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorites } = useFavorites();

  const idToCheck = product.id;
  const added = isInCart(idToCheck);
  const favorite = isFavorites(idToCheck);

  const { t } = useTranslation();

  return (
    <div
      className={classNames(
        `${styles.actions} ${styles[`actions--${variant}`]}`,
        className,
      )}
    >
      <Button
        className={styles.addButton}
        variant={added ? 'secondary' : 'primary'}
        disabled={added}
        onClick={() => addToCart(product)}
      >
        {added ? t('actions.AddedToCart') : t('actions.AddToCart')}
      </Button>

      <button
        type="button"
        className={`${styles.favoriteButton} ${favorite ? styles.favoriteActive : ''}`}
        onClick={() => toggleFavorite(product)}
      >
        <HeartIcon isSelected={favorite} className={styles.heartIcon} />
      </button>
    </div>
  );
};
