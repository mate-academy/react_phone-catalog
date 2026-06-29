import styles from './FavoritesPage.module.scss';
import { useTranslation } from 'react-i18next';

import Breadcrumbs from '../shared/Breadcrumbs';
import ProductList from '../shared/ProductList';
import { useAppSelector } from '../../store/hooks';

const FavoritesPage = () => {
  const { t } = useTranslation();

  const favorites = useAppSelector(state => state.favorites);

  const favoriteProducts = Object.values(favorites);
  const count = Object.keys(favorites).length;

  const itemsAmount = t('favorites.items', { count });

  return (
    <div className="container">
      <div>
        <Breadcrumbs />
        <h1 className={styles.favorites__title}>{t(`favorites.title`)}</h1>
        <p className={styles.favorites__counter}>{itemsAmount}</p>
        <ProductList pageProducts={favoriteProducts} />
      </div>
    </div>
  );
};

export default FavoritesPage;
