import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductCard } from '../../components/ProductCard';
import { useFavorites } from '../../context/FavoritesContext';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { favorites, totalFavorites } = useFavorites();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const normalizedQuery = query.toLowerCase().trim();

  const filtered = query
    ? favorites.filter(p => p.name.toLowerCase().includes(normalizedQuery))
    : favorites;

  return (
    <div className="container">
      <Breadcrumbs items={[{ label: 'Favourites' }]} />

      <h1 className="page__title">Favourites</h1>
      <p className="page__subtitle">{totalFavorites} items</p>

      {filtered.length === 0 ? (
        <p className={styles.favPage__empty}>
          {query
            ? `No search results for "${query}"`
            : "You don't have any favourites yet"}
        </p>
      ) : (
        <div className={styles.favPage__grid} data-cy="productList">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
