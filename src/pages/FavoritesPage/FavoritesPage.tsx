import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import styles from './FavoritesPage.module.scss';
import { useLanguage } from '../../context/LanguageContext';

import { useFavorites } from '../../context/FavoritesContext';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductCard } from '../../components/ProductCard';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useLanguage();

  useEffect(() => {
    document.title = t('favorites.documentTitle');
  }, [t]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const query = (searchParams.get('query') || '').trim().toLowerCase();
  const queryWords = query.split(/\s+/).filter(Boolean);

  const filteredFavorites = favorites.filter(p => {
    const nameLower = p.name.toLowerCase();

    return queryWords.every(word => nameLower.includes(word));
  });

  const handleClearSearch = () => {
    setSearchParams({ query: '' });
  };

  return (
    <div
      className={`${styles.favoritesPage} container`}
      data-testid="favorites-page"
    >
      <Breadcrumbs
        category="favorites"
        categoryLabel={t('categories.favorites')}
      />

      <h1 className={styles.title}>{t('favorites.title')}</h1>

      {favorites.length === 0 ? (
        <div className={styles.emptyState}>
          <p>{t('favorites.emptyText')}</p>
          <Link to="/" className={styles.shopBtn}>
            {t('favorites.findGadgets')}
          </Link>
        </div>
      ) : filteredFavorites.length === 0 ? (
        <div className={styles.emptyState}>
          <p>{t('favorites.noItemsMatching')}</p>
          <button
            type="button"
            className={styles.clearSearchBtn}
            onClick={handleClearSearch}
          >
            {t('favorites.clearSearch')}
          </button>
        </div>
      ) : (
        <>
          <div className={styles.count}>
            {filteredFavorites.length === 1
              ? t('favorites.itemsCount_1', { count: filteredFavorites.length })
              : t('favorites.itemsCount', { count: filteredFavorites.length })}
          </div>

          <div className={styles.grid}>
            {filteredFavorites.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
