import { useFavorites } from '../shared/context/FavoritesContext';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <div>
      <h1>Favorites</h1>

      {favorites.length === 0 && <p>There are no favorites yet</p>}

      {favorites.length > 0 && (
        <ul>
          {favorites.map(product => (
            <li key={product.itemId}>{product.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
