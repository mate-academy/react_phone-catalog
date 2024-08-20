import { Product } from '../types/Product';

export const addedToFavorites = (favorites: Product[], id: string) => {
  return favorites.some(product => product.itemId === id);
};

export const handleAddToFavoritesClick = (
  favorites: Product[],
  setFavorites: (favorites: Product[]) => void,
  product: Product,
) => {
  if (!addedToFavorites(favorites, product.itemId)) {
    setFavorites([...favorites, product]);
  } else {
    const updatedFavoritesProducts = favorites.filter(
      favorite => favorite.id !== product.id,
    );

    setFavorites(updatedFavoritesProducts);
  }
};
