import { useProducts } from '../../Store';
import { ProductCard } from '../../components/ProductCard';
import { ShowLocation } from '../../components/ShowLocation';

import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const favouritesProducts = useProducts(state => state.favouritesProducts);

  return (
    <>
      <ShowLocation />
      <h1>Favourites</h1>
      <p className={`bodyText ${styles.countProducts}`}>{`${favouritesProducts.length} models`}</p>

      {favouritesProducts.length
        ? (
          <div className={styles.favourites}>
            {favouritesProducts.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )
        : (
          <h2>There are no favorites yet</h2>
        )}
    </>
  );
};
