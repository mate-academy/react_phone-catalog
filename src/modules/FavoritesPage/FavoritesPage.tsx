import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductsList } from '../shared/components/ProductsList';
import { useFavorites } from '../shared/context/FavoritesContext';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const shownFavorites = useMemo(() => {
    return favorites.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [favorites, query]);

  return (
    <section className="page">
      <h1 className="page__title">Favorites</h1>
      <p className="page__count">{favorites.length} items</p>
      {!favorites.length && (
        <p className="page__empty">You have no favorite products yet</p>
      )}
      {favorites.length > 0 && !shownFavorites.length && (
        <p className="page__empty">There are no products matching the query</p>
      )}
      {shownFavorites.length > 0 && <ProductsList products={shownFavorites} />}
    </section>
  );
};
