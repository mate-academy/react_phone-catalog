import { useFavorites } from '@/contexts/FavoritesContext';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { ProductsList } from '../shared/components/ProductsList';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <div className={styles.page}>
      <Breadcrumbs items={[{ label: 'Favorites' }]} />
      <h1>Favorites page</h1>
      <ProductsList products={favorites} />
    </div>
  );
};
