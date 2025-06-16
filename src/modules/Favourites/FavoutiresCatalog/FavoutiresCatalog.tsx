import styles from './FavoutiresCatalog.module.scss';
import { ProductList } from '../../../components/ProductList';
import { useProducts } from '../../../context/ProductsContext';

export const FavoutiresCatalog = () => {
  const { favorites } = useProducts();

  return (
    <div className={styles.cataloge}>
      <h1 className={styles.cataloge__title}>Favourites</h1>
      {favorites.length > 0 ? (
        <>
          <div className={styles.cataloge__items_amount}>
            {favorites.length} models
          </div>

          <ProductList products={favorites} />
        </>
      ) : (
        <h2 className={styles.cataloge__empty}>
          It&apos;s a bit empty here 😔 Add some items to your favorites to
          easily find them later!
        </h2>
      )}
    </div>
  );
};
