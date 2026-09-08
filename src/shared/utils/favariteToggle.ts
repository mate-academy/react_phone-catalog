import { Product } from '../types/Product';

export const handleFavoriteToggle = (
  card: Product,
  favorites: Product[],
  setFavorites: (product: Product[]) => void,
) => {
  const isFavorite = favorites.some(item => item.itemId === card.itemId);

  if (isFavorite) {
    setFavorites(favorites.filter(item => item !== card));
  } else {
    setFavorites([...favorites, card]);
  }
};
