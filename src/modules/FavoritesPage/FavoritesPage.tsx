/* eslint-disable max-len */
import { useFavorites } from '../../context/favorites/useFavorites';
import { ProductsCategory } from '../../views/ProductsCategory/ProductsCategory';
/* eslint-enable max-len */

export const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <ProductsCategory
      title="Favourites"
      products={favorites}
      subtitleLabel="items"
    />
  );
};
