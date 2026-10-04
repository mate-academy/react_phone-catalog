// import { GoBack } from '@/shared/components/GoBack/GoBack';

import container from '@/shared/styles/Container.module.scss';
import styles from './FavoritesPage.module.scss';
import { useFavorites } from '@/shared/context/FavoriteContext/useFavorites';
import { useTranslation } from 'react-i18next';
import { FavoritesItems } from './components/FavoritesItems/FavoritesItems';
import { Breadcrumbs } from '@/shared/components/Breadcrumbs';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();

  const { t } = useTranslation();

  const itemsOrModel = favorites.length === 1 ? 'model' : 'models';

  return (
    <div className={container.container}>
      <Breadcrumbs title={t('breadcrumbs.favorites')} />
      <h1 className={styles.title}>{t('favorites.title')}</h1>
      {favorites.length > 0 && (
        <p className={styles.count}>
          {favorites.length} {itemsOrModel}
        </p>
      )}

      <div className={styles.favoritesItems}>
        {favorites.length === 0 ? (
          <p className={styles.emptyList}> Your favorites list is empty</p>
        ) : (
          <FavoritesItems products={favorites} />
        )}
      </div>
    </div>
  );
};
