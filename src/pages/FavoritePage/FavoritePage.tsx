import { useAppSelector } from '../../utils/hooks';

import { AllProduct } from '../../types/UnionType';

import styles from './FavoritePage.module.scss';

import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductList } from '../../components/ProductList';

export const FavoritePage: React.FC = () => {
  const favorites = useAppSelector(
    state => state.favorites.data,
  ) as AllProduct[];

  return (
    <div className={styles.favoritePage}>
      <Breadcrumbs />
      <h1 className={styles.favoritePage__title}>Favorites</h1>
      <span className={styles.favoritePage__modelCount}>
        {`${favorites.length || 0} items`}
      </span>
      {favorites.length !== 0 && (
        <ProductList products={favorites} loader={false} />
      )}
    </div>
  );
};
