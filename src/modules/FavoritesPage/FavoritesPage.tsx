import styles from './FavoritesPage.module.scss';
import { Breadcrumbs } from '../shared/Breadcrumbs/Breadcrumbs';
import { useFavorites } from '../../context/FavoritesContext';
import { ProductsList } from '../shared/ProductsList/ProductsList';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

export const FavoritesPage = () => {
  const { favoritesItems } = useFavorites();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const filteredItems = useMemo(() => {
    if (!query) {
      return favoritesItems;
    }

    return favoritesItems.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [favoritesItems, query]);

  return (
    <div className="container">
      <Breadcrumbs
        items={[{ label: 'Home', path: '/' }, { label: 'Favorites' }]}
      />

      <h1 className={styles.title}>Favorites</h1>

      <p className={styles.count}>{favoritesItems.length} items</p>

      {filteredItems.length === 0 && (
        <p>
          {query
            ? `There are no favorites matching "${query}"`
            : 'No favorites yet'}
        </p>
      )}

      {filteredItems.length > 0 && <ProductsList products={filteredItems} />}
    </div>
  );
};
