import { useTranslation } from 'react-i18next';
import { useGlobalState } from '../../context/store';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { ProductList } from '../shared/ProductList';
import styles from './FavouritesPage.module.scss';

export const FavouritesPage = () => {
  const { favourites } = useGlobalState();
  const { t } = useTranslation();

  return (
    <div className={styles.favouritesContent}>
      <div className={styles.favouritesBreadcrumbs}>
        <Breadcrumbs />
      </div>

      <h1 className={styles.favouritesTitle}>{t('favouritesTitle')}</h1>

      <div className={styles.favouritesQuantity}>
        {favourites.length === 1 ? '1 item' : `${favourites.length} items`}
      </div>

      <div className={styles.favouritesItems}>
        <ProductList products={favourites} />
      </div>
    </div>
  );
};
