import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { ProductCard } from '../../components/ProductCard';
import { useFavourites } from '../../context/FavouritesContext';
import styles from '../../modules/FavouritesPage/FavouritesPage.module.scss';

export const FavoritesPage = () => {
  const { favourites } = useFavourites();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mobile phones</h1>
      <p className={styles.subtitle}>{favourites.length} models</p>

      <Breadcrumbs />
      {favourites.length === 0 && (
        <p className={styles.favoritesEmpty}>There is nothing here now</p>
      )}
      {favourites.length > 0 && (
        <div className={styles.slider}>
          {favourites.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
