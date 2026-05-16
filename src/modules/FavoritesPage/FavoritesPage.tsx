import { Loader } from '../../components/Loader';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useProducts } from '../../hooks/useProducts';
import { ProductsList } from '../Catalog/components/ProductsList';
import { BreadCrumbs } from '../shared/components/BreadCrumbs';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const { products, isLoading, error } = useProducts();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const favouritesProducts = products.filter(product =>
    favorites.includes(product.id),
  );

  return (
    <div className="container">
      <BreadCrumbs category="Favourites" />

      {favorites.length === 0 ? (
        <h1>{`Your Favourites list is empty`}</h1>
      ) : (
        <>
          <h1 className={styles.title}>Favourites</h1>
          <p className={styles['favourites-qnt']}>{favorites.length} models</p>

          <ProductsList products={favouritesProducts} />
        </>
      )}
    </div>
  );
};
