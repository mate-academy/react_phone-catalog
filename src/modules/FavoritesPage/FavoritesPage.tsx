import { FC } from 'react';
// eslint-disable-next-line
import styles from './FavoritesPage.module.scss';
import { useCatalog } from '../../contexts/CatalogProvider';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductCard } from '../../components/ProductCard';

export const FavoritesPage: FC = () => {
  const { favorites } = useCatalog();

  return (
    <div className={styles.container}>
      <div className={styles.productTop}>
        <Breadcrumbs />
        <h1 className={styles.title}>Favourites</h1>

        <p className={styles.count}>
          {!favorites.length
            ? 'Not items'
            : `${favorites.length} item${favorites.length > 1 ? 's' : ''}`}
        </p>
      </div>
      <div className={styles.list}>
        {favorites.map(item => {
          return <ProductCard product={item} key={item.id} />;
        })}
      </div>
    </div>
  );
};
