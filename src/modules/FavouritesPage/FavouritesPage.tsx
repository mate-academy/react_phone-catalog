import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFavorites, useSearch } from '../../contexts';
import { Icon } from '../shared/components/Icon/Icon';
import { ProductCard } from '../shared/components/ProductCard';
import styles from './FavouritesPage.module.scss';

export const FavouritesPage: React.FC = () => {
  const { favorites } = useFavorites();
  const { t } = useTranslation();
  const { searchQuery, setShowSearch, setSearchPlaceholder } = useSearch();
  const [filteredFavorites, setFilteredFavorites] = useState(favorites);

  // Enable search in header
  useEffect(() => {
    setShowSearch(true);
    setSearchPlaceholder(t('favorites.searchPlaceholder'));

    return () => {
      setShowSearch(false);
    };
  }, [setShowSearch, setSearchPlaceholder, t]);

  // Filter favorites by search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = favorites.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );

      setFilteredFavorites(filtered);
    } else {
      setFilteredFavorites(favorites);
    }
  }, [favorites, searchQuery]);

  return (
    <div className={styles['favourites-page']}>
      <h1 className={styles['favourites-page__title']}>
        {t('favorites.title')}
      </h1>

      {favorites.length === 0 ? (
        <div className={styles['favourites-page__empty']}>
          <Icon name="like" />
          <p className={styles['favourites-page__empty-text']}>
            {t('favorites.empty')}
          </p>
          <p className={styles['favourites-page__empty-subtext']}>
            {t('favorites.emptySubtext')}
          </p>
        </div>
      ) : (
        <>
          <p className={styles['favourites-page__count']}>
            {favorites.length === 1
              ? t('favorites.item', { count: favorites.length })
              : t('favorites.items', { count: favorites.length })}
          </p>

          {filteredFavorites.length === 0 && searchQuery ? (
            <div className={styles['favourites-page__no-results']}>
              <p>{t('favorites.noMatching')}</p>
            </div>
          ) : (
            <div className={styles['favourites-page__grid']}>
              {filteredFavorites.map(product => (
                <ProductCard key={product.itemId} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
