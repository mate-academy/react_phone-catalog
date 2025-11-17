import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFavorites } from '../../modules/shared/context/FavoriteContext';
import styles from './FavoritePage.module.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
// eslint-disable-next-line max-len
import { ProductCard } from '../CategoryPage/components/ProductCard/ProductCard';

export const FavoritePage: React.FC = () => {
  const { t } = useTranslation();
  const { favorites } = useFavorites();

  return (
    <div className={styles.favorites}>
      <Breadcrumbs />

      <h1 className={styles.title}>{t('favorites')}</h1>

      <p className={styles.counter}>
        {favorites.length} {t('items')}
      </p>

      {favorites.length === 0 ? (
        <div className={styles.empty}>
          <p>{t('favoritesEmpty')}</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {favorites.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
