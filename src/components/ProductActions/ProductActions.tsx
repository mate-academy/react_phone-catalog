import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { ProductCategory } from '../../types/ProductCategory';
import { useCart } from '../../utils/hooks/Context/useCart';
import { useFavorites } from '../../utils/hooks/Context/useFavorites';
import styles from './ProductActions.module.scss';
import { useProductAction } from './useProductAction';
import { useState } from 'react';
import { Loader } from '../../elements/Loader';

type Props = {
  itemId: string;
  category: ProductCategory;
  size?: 'big' | 'biggest';
};

export const ProductActions: React.FC<Props> = ({
  itemId,
  category,
  size = 'big',
}) => {
  const { t } = useTranslation();
  const { cart, toggleToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();
  const { generalAction, error } = useProductAction({
    category,
    itemId,
  });

  const [cartLoading, setCartLoading] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  const sizeClass = size === 'biggest' ? 'button--biggest' : 'button--big';

  const isOnCart = cart.some(p => p.itemId === itemId);
  const isOnFavorite = favorites.some(p => p.itemId === itemId);

  const handleToggleCart = async () => {
    try {
      setCartLoading(true);
      const product = await generalAction();

      toggleToCart(product);
    } finally {
      setCartLoading(false);
    }
  };

  const handleToggleFavorite = async () => {
    try {
      setFavoriteLoading(true);
      const product = await generalAction();

      toggleFavorite(product);
    } finally {
      setFavoriteLoading(false);
    }
  };

  return (
    <div className={styles.actions}>
      <button
        className={classNames(
          'button button--width100',
          sizeClass,
          isOnCart ? 'button--cart' : 'button--filled',
        )}
        disabled={cartLoading}
        onClick={handleToggleCart}
      >
        {cartLoading ? (
          <Loader size="small" />
        ) : isOnCart ? (
          t('addedToCart')
        ) : (
          t('addToCart')
        )}
      </button>

      <button
        className={classNames(
          'button button--icon',
          sizeClass,
          favoriteLoading && 'button--light-disabled',
        )}
        disabled={favoriteLoading}
        onClick={handleToggleFavorite}
      >
        {favoriteLoading ? (
          <Loader size="small" />
        ) : (
          <span
            className={classNames(
              'icon',
              isOnFavorite ? 'icon--favorite-filled' : 'icon--favorite',
            )}
          />
        )}
      </button>

      {error && <span className={styles.error}>{t(error)}</span>}
    </div>
  );
};
