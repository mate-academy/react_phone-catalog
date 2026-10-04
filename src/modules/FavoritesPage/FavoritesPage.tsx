import { Container } from '../shared/components/Container';
import { PageHeader } from '../shared/components/PageHeader';
import { ProductsList } from '../shared/components/ProductsList';
import { useFavorites } from '../shared/context/FavoritesContext';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <Container className={styles.page}>
      <PageHeader
        breadcrumbs={[{ label: 'Favourites' }]}
        title="Favourites"
        subtitle={`${favorites.length} items`}
      />

      {favorites.length === 0 ? (
        <p className={styles.empty}>There are no favourites yet</p>
      ) : (
        <ProductsList products={favorites} />
      )}
    </Container>
  );
};
