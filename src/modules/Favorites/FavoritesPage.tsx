import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './FavoritesPage.module.scss';

import { ProductCard } from '../../components/ProductCard';
import { useFavorites } from '../../hooks/useFavorites';
import { Breadcrumbs } from '../../components/Breadcrumbs';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();
  const { t } = useTranslation();

  return (
    <div className={styles.favoritesPage}>
      <Breadcrumbs />

      <h1 className={styles.title}>{t('favorites')}</h1>
      <p className={styles.count}>
        {t('common.total', { count: favorites.length })}
      </p>

      {favorites.length > 0 ? (
        <div className={styles.grid}>
          {favorites.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <h2>{t('common.title')}</h2>
        </div>
      )}
    </div>
  );
};
