import { useFavorites } from '../FavoritesProvider/FavoritesProvider';
import { PositionOnPage } from '../shared/PositionOnPage/PositionOnPage';
import { ProductCard } from '../shared/ProductCard';
import { useLanguage } from '../../contexts/LanguageContext';

import styles from './FavoritesPage.module.scss';
import globalStyle from '../../styles/index.module.scss';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const { t } = useLanguage();

  return (
    <div className={styles.favoritesPage__Container}>
      {favorites.length > 0 ? (
        <>
          <PositionOnPage />
          <div className={styles.favoritesPage__Header}>
            <h1 className={styles.favoritesPage__Title}>
              {t('favorites.title')}
            </h1>
            <p className={styles.favoritesPage__Count}>
              {favorites.length} {t('favorites.items')}
            </p>
          </div>
          <div className={styles.favoritesPage__ItemList}>
            {favorites.map(item => (
              <ProductCard device={item} key={item.id} />
            ))}
          </div>
        </>
      ) : (
        <img
          src="img/cart-is-empty.png"
          alt={t('favorites.emptyAlt')}
          className={globalStyle.emptyStateImage}
        />
      )}
    </div>
  );
};
