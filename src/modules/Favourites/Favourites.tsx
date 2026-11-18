import { useFavourites } from '../../context/FavouritesContext';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { ProductCard } from '../shared/ProductCard';
import styles from './Favourites.module.scss';

export const Favourites = () => {
  const { favourites } = useFavourites();

  return (
    <>
      <div className="inline-container">
        <Breadcrumbs />
      </div>
      <section className={styles.favourites}>
        <div className="inline-container">
          <h1 className={`page-title ${styles.favourites__title}`}>
            Favourites
          </h1>
          <p className={styles.favourites__info}>{favourites.length} items</p>
          <div className={styles.favourites__list}>
            {favourites.map(product => (
              <ProductCard key={product.id} item={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
