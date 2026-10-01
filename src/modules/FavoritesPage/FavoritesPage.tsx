import { useSearchParams } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import { ProductsList } from '../../components/ProductsList';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { items } = useFavorites();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="container">
      <h1 className={styles.title}>Favourites</h1>
      <p className={styles.count}>
        {items.length} {items.length === 1 ? 'item' : 'items'}
      </p>

      {items.length === 0 && (
        <p className={styles.emptyMessage}>No favourites yet</p>
      )}

      {items.length > 0 && filteredItems.length === 0 && (
        <p className={styles.emptyMessage}>
          There are no products matching the query
        </p>
      )}

      {filteredItems.length > 0 && <ProductsList products={filteredItems} />}
    </div>
  );
};
