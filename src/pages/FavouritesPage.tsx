import { useFavourite } from '../context/FavContext';
import { ProductCard } from '../components/ProductCard/ProductCard';
import styles from './FavouritesPage.module.scss';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';

export const FavouritesPage = () => {
  const { favourites } = useFavourite();

  return (
    <div className={styles.favouritesPage}>
      <Breadcrumbs category="favourites" />
      <h1 className={styles.titlePage}>Favourites</h1>
      <p className={styles.favouritesItems}>{favourites.length} items</p>
      {favourites.length === 0 ? (
        <p className={styles.emptyPage}>No items were choosen yet :( </p>
      ) : (
        favourites.map(product => (
          <ProductCard key={product.id} product={product} variant="catalog" />
        ))
      )}
    </div>
  );
};
