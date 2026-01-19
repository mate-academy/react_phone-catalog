import { useTranslation } from 'react-i18next';
import styles from './FavoritesPage.module.scss';
import { ProductsList } from '../../components/ProductsList';
import { useFavorites } from '../../utils/hooks/Context/useFavorites';
import { Plug } from '../../components/Plug/Plug';

export const FavoritesPage = () => {
  const { t } = useTranslation();
  const { favorites, error } = useFavorites();

  const isPlugVisible = !error && favorites.length === 0;

  return (
    <section className={styles.FavoritesPage__section}>
      <h1 className={styles['FavoritesPage__header-text']}>
        {t('favoritesPage')}
      </h1>

      {error && <p className={styles.error}>{t(`errors.${error}`)}</p>}

      {isPlugVisible && (
        <div className={styles.FavoritesPage__plug}>
          <Plug label={t('noFavorites')} />
        </div>
      )}
      {!isPlugVisible && (
        <>
          <p className={styles.FavoritesPage__models}>
            {t('itemsCount', { count: favorites.length })}
          </p>
          <ProductsList products={favorites} />
        </>
      )}
    </section>
  );
};
