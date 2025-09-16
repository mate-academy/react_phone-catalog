// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslation } from 'react-i18next';
import { useFavorites } from '../../contexts/FavoritesContext';
import { ProductsList } from '../ProductsList/ProductsList';
import { SectionBreadcrumbs } from '../SectionBreadcrumbs';
import styles from './Favorites.module.scss';

export const Favorites = () => {
  const { favorites } = useFavorites();
  const { t } = useTranslation();

  return (
    <section className={styles.favorites}>
      <SectionBreadcrumbs currentLink={t('sections.favorites')} />

      <h1 className={styles.favorites__title}>{t('sections.favorites')}</h1>
      <p className={styles.favorites__quantity}>
        {favorites.length === 1
          ? t('elements.item')
          : t('elements.items', { count: favorites.length })}
      </p>

      {favorites.length > 0 && (
        // eslint-disable-next-line max-len
        <ProductsList currentItems={favorites} isFavorites={true} isWideCard={true} />
      )}
    </section>
  );
};
