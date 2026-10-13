import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFavorites } from '../shared/context/FavoritesContext';
import { useLanguage } from '../shared/context/LanguageContext';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { ProductsList } from '../shared/components/ProductsList';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  const filteredFavorites = useMemo(() => {
    if (!query.trim()) {
      return favorites;
    }

    const normalizedQuery = query.toLowerCase().trim();

    return favorites.filter(p =>
      p.name.toLowerCase().includes(normalizedQuery),
    );
  }, [favorites, query]);

  return (
    <div className={styles.page}>
      <div className="main-container">
        <Breadcrumbs items={[{ label: t('favorites') }]} />

        <h1 className={styles.title}>{t('favorites')}</h1>

        {favorites.length === 0 ? (
          <p className={styles.emptyState}>
            {t('noProductsYet', { category: t('favorites').toLowerCase() })}
          </p>
        ) : (
          <>
            <p className={styles.count}>
              {filteredFavorites.length} {t('models')}
            </p>

            {filteredFavorites.length === 0 ? (
              <p className={styles.emptyState}>
                {t('noMatchingProducts', {
                  category: t('favorites').toLowerCase(),
                })}
              </p>
            ) : (
              <ProductsList products={filteredFavorites} />
            )}
          </>
        )}
      </div>
    </div>
  );
};
