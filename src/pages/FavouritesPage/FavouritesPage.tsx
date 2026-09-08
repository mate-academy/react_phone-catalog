import { Breadcrumbs } from '../../components/Breadcrumbs';
import styles from './FavouritesPage.module.scss';
import { ProductsList } from '../../components/ProductsList';
import { useSearchParams } from 'react-router-dom';
import { useProcessedProducts } from '../../hooks/useProcessedProducts';
import { useUserActions } from '../../context/useUserActions';

export const FavouritesPage = () => {
  const { favourites } = useUserActions();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const filteredFavourites = useProcessedProducts(favourites, {
    sort: 'name',
    filters: { query },
  });

  return (
    <div className={styles.favouritesPage}>
      <div className={styles.favouritesPage__container}>
        <div className={styles.favouritesPage__breadcrumbs}>
          <Breadcrumbs />
        </div>

        <h1 className={styles.favouritesPage__heading}>Favourites</h1>

        <div className={styles.favouritesPage__count}>
          {`${filteredFavourites.length} ${filteredFavourites.length === 1 ? 'item' : 'items'}`}
        </div>

        {filteredFavourites.length > 0 ? (
          <ProductsList products={filteredFavourites} hasDiscount={true} />
        ) : (
          <p className={styles.favouritesPage__noFavourites}>
            {' '}
            No favourites yet
          </p>
        )}
      </div>
    </div>
  );
};
