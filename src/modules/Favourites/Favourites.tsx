import { Pagetoolbar } from '../../components/layout/Pagetoolbar';
import { ProductCard } from '../../components/layout/ProductCard';
import { useFavourites } from '../../hooks/useFavourites';
import styles from './Favourites.module.scss';

export const Favourites = () => {
  const { favourites } = useFavourites();

  return (
    <div className={styles.container}>
      <Pagetoolbar breadcrumbs title="Favourites" subtitle="5 items" />
      <div className={styles.content}>
        {favourites.length === 0 ? (
          <h2 className={styles.title}>Add your favourites products!</h2>
        ) : (
          <div className={styles.products}>
            {favourites.map(item => {
              return <ProductCard key={item.id} product={item} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};
