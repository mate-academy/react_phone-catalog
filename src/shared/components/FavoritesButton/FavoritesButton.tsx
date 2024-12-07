import { useCallback, useMemo } from 'react';

import cn from 'classnames';
import toast from 'react-hot-toast';

import FilledHeartIcon from '@assets/images/icons/filled-heart-icon.svg?react';
import HeartIcon from '@assets/images/icons/heart-icon.svg?react';

import { IconButton } from '@shared/base/IconButton';
import { useStoredProducts } from '@shared/contexts/StoredProducts';

import styles from './FavoritesButton.module.scss';

interface FavoriteButtonProps {
  productId?: string;
  title: string;
  className?: string;
  size?: 'md' | 'sm' | 'lg';
}

export const FavoritesButton: React.FC<FavoriteButtonProps> = ({
  productId,
  title,
  className,
  size = 'md',
}) => {
  const { storedProducts, updateStoredProducts } = useStoredProducts();

  const isFavorite = useMemo(
    () =>
      storedProducts.favoriteProducts.some(
        product => productId === product.productId,
      ),
    [storedProducts, productId],
  );

  const handleAdd = useCallback(() => {
    if (!productId) {
      return;
    }

    updateStoredProducts({
      storedKey: 'favoriteProducts',
      productId,
      action: 'toggle',
      storedProducts,
      callback: doneAction => {
        if (doneAction === 'added') {
          toast.success(
            `${title} has been added to the favorites successfully`,
          );
        } else {
          toast.success(
            `${title} has been removed from the favorites successfully`,
          );
        }
      },
    });
  }, [productId, storedProducts, updateStoredProducts, title]);

  return (
    <IconButton
      className={cn(styles.btn, className, {
        [styles.active]: isFavorite,
      })}
      Icon={isFavorite ? FilledHeartIcon : HeartIcon}
      size={size}
      onClick={handleAdd}
      disabled={!productId}
    />
  );
};
