import { useMemo } from 'react';
import { useFavorite } from '../../../contexts/FavoritesContext';
import { ProductList } from '../../shared/components/ProductsList';
import styles from './FavoriteContent.module.scss';
import { useTranslation } from 'react-i18next';

export const FavoriteContent = () => {
  const { t } = useTranslation();

  const { favorite } = useFavorite();
  const favoriteProducts = useMemo(() => {
    return favorite.map(item => item.product);
  }, [favorite]);

  if (favorite.length === 0) {
    return (
      <div className={styles.errorWrapper}>
        <p className={styles.errorMessage}>{t('favorites.empty')}</p>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.container}>
        <h2 className={styles.title}>{t('favorites.title')}</h2>
        <span className={styles.currentQuantity}>
          {t('favorites.itemsCount', { count: favorite.length })}
        </span>

        <div className={styles.favoriteList}>
          <ProductList products={favoriteProducts} />
        </div>
      </div>
    </div>
  );
};
