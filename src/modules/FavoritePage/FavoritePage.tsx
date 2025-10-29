import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFavorites } from '../shared/context/FavoriteContext';
// eslint-disable-next-line max-len
import { ProductsList } from '../CategoryPage/components/ProductsList/ProductsList';
import styles from './FavoritePage.module.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';

export const FavoritePage: React.FC = () => {
  const { t } = useTranslation();
  const { favorites } = useFavorites();

  return (
    <div className={styles.favorites}>
      <Breadcrumbs />
      <h1>{t('favorites')}</h1>
      <p className={styles.h1}>
        {favorites.length} {t('items')}
      </p>
      {favorites.length === 0 ? (
        <p>{t('favoritesEmpty')}</p>
      ) : (
        <ProductsList products={favorites} />
      )}
    </div>
  );
};
