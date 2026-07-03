// #region imports
import {
  FavoritesContent,
  FavoritesSkeleton,
} from './components/FavoritesContent';
import { FavoritesEmpty } from './components/FavoritesEmpty';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { useAppSelector } from '../../store/hooks';
import { useLoading } from '../shared/hooks/useLoading';
import { useTranslation } from 'react-i18next';
import styles from './FavoritesPage.module.scss';
// #endregion

export const FavoritesPage = () => {
  const { t } = useTranslation('favorites');

  const favorites = useAppSelector(state => state.favorites);
  const isLoading = useLoading();

  return (
    <section className={styles.favorites} aria-label={t('favorites')}>
      <Breadcrumbs items={[{ label: t('favorites') }]} />

      {isLoading && <FavoritesSkeleton />}

      {!isLoading && favorites.length === 0 && <FavoritesEmpty />}

      {!isLoading && favorites.length > 0 && (
        <FavoritesContent products={favorites} />
      )}
    </section>
  );
};
