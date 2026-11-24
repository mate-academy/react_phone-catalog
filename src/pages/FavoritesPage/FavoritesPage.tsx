import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useFavorites } from '../../context/FavoritesContext';
import styles from '../ProductsPage/ProductsPage.module.scss';
import { ProductsList } from '../../components/ProductsList';
import { StatusMessage } from '../../components/StatusMessage';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return <StatusMessage text="There are no favorites yet" />;
  }

  return (
    <section className={styles.page}>
      <Breadcrumbs title="Favorites" />
      <h1 className={styles.page__title}>Favorites</h1>
      <p className={styles.page__text}>{favorites.length} items</p>
      <ProductsList products={favorites} />
    </section>
  );
};
