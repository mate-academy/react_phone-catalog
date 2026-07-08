//react
import { useContext } from 'react';

//hooks
import { useProducts } from '../../hooks/useProducts';

//styles
import styles from './Favourites.module.scss';

//components
import { Loader } from '../../components/Loader';
import { ProductCard } from '../../components/ProductCard';

//services
import { FavouritesContext } from '../../services/FavouritesContext';

export const Favourites = () => {
  const { data: allProducts = [], isLoading } = useProducts();
  const { favourites } = useContext(FavouritesContext)!;

  const favouriteProducts = favourites
    .map(id => allProducts.find(p => p.id === id))
    .filter(Boolean)
    .filter(product => product !== undefined);

  const productsCount = favouriteProducts.length;

  if (isLoading) {
    return <Loader className={styles.loader} />;
  }

  return (
    <div className={styles.favourites}>
      <h1 className={styles.title}>Favourites</h1>

      <p className={styles.subtitle}>
        {productsCount} item{productsCount !== 1 && 's'}
      </p>

      <div className={styles.list}>
        {favouriteProducts.map(product => {
          return (
            <ProductCard
              product={product}
              key={product.id}
              className={styles.productCard}
            />
          );
        })}
      </div>
    </div>
  );
};
