import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { FavoriteContent } from './FavoriteContent';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  return (
    <div className={styles.container}>
      <Breadcrumbs />

      <FavoriteContent />
    </div>
  );
};
