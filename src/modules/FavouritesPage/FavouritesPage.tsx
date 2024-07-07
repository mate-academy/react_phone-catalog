import styles from './FavouritesPage.module.scss';
import { useAppContext } from '../../context/AppContext';
import { ProductCard } from '../../components/ProductCard/ProductCard';

export const FavouritesPage = () => {
  const { favourites } = useAppContext();

  return (
    <div className={styles.favouritesPage}>
      <div className={styles.upperContainer}>
        {/* <Breadcrumbs /> */}

        <h1 className={styles.pageTitle}>Favourites</h1>

        <p
          className={styles.count}
        >{`${favourites.length} item${favourites.length !== 1 ? 's' : ''}`}</p>
      </div>

      <div className={styles.mainContainer}>
        {favourites.map(product => (
          <div key={product.id} className={styles.product}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
