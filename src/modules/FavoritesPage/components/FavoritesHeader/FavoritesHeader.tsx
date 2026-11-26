import { Breadcrumbs } from '../../../shared/components/Breadcrumbs';
import { useFavorites } from '../../../shared/context/FavoritesContext';
import styles from './FavoritesHeader.module.scss';

export function FavoritesHeader(): JSX.Element {
  const { count } = useFavorites();

  const breadcrumbItems = [{ label: 'Favourites' }];

  return (
    <header className={styles.header}>
      <Breadcrumbs items={breadcrumbItems} />
      <div className={styles.titleRow}>
        <h1 className={styles.title}>Favourites</h1>
        <p className={styles.count}>
          {count} {count === 1 ? 'item' : 'items'}
        </p>
      </div>
    </header>
  );
}
