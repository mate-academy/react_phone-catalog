import { ProductsList } from '../shared/components/ProductsList';
import { useFavorites } from '../shared/context/FavoritesContext';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <section className="page">
      <h1>Favorites</h1>
      {favorites.length ? (
        <ProductsList products={favorites} />
      ) : (
        <p>You have no favorite products yet</p>
      )}
    </section>
  );
};
