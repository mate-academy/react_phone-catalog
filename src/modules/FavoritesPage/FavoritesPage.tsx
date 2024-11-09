import styles from './FavoritesPage.module.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useContext } from 'react';
import { FavouriteContext } from '../../ContextProvider';
import { ProductCard } from '../../components/ProductCard';

export const FavoritesPage = () => {
  const { favouriteProducts } = useContext(FavouriteContext);

  return (
    <section className={styles.favoritesPageWrapper}>
      <Breadcrumbs productList={favouriteProducts} />
      <div className={styles.favoritesPageContainer}>
        <h1 className={styles.title}>Favorites</h1>
        <p className={styles.categoryNumModels}>
          {favouriteProducts.length} models
        </p>
        <div className={styles.productsContainer}>
          {favouriteProducts.map(product => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </section>
  );
};
