import styles from './FavouritePage.module.scss';
import { useProductsContext } from '../../hooks/savedProducts';
import { useProducts } from '../../hooks/useProducts';
import { ProductCard } from '../../components/ProductCard';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useErrorHandling } from '../../hooks/errorHandling';
import { Loader } from '../../components/Loader';

export const FavouritesPage = () => {
  const { likedProducts } = useProductsContext();
  const { setIsError } = useErrorHandling();
  const { products } = useProducts(() => setIsError(true));

  const likedItems = products.filter(product =>
    likedProducts.includes(product.id),
  );

  if (products.length === 0) {
    return <Loader />;
  }

  return (
    <div className={styles.favourite}>
      <div className={styles.favourite__breadcrumbs}>
        <Breadcrumbs />
      </div>
      <h1 className={styles.favourite__title}>Favourites</h1>
      <p className={styles.favourite__count}>{`${likedItems.length} items`}</p>
      <div className={styles.favourite__products}>
        {likedItems.length > 0 &&
          likedItems.map(item => (
            <ProductCard
              key={item.id}
              product={item}
              path={`/product/${item.id}`}
            />
          ))}
      </div>
    </div>
  );
};
