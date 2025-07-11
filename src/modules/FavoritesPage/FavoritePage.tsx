import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFavorites } from '../shared/context/FavoriteContext';
import { ProductsList } from '../CategoryPage/components/ProductsList/ProductsList';
import styles from './FavoritePage.module.scss';

export const FavoritePage: React.FC = () => {
  const { t } = useTranslation();
  const { favorites } = useFavorites();

  return (
    <div className={styles.favorites}>
      <h1>{t('favorites')}</h1>
      {favorites.length === 0 ? (
        <p>{t('favoritesEmpty')}</p>
      ) : (
        <ProductsList products={favorites} />
      )}
    </div>
  );
};
