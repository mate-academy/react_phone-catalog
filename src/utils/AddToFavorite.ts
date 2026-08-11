import { Product } from '../types/product';

export const AddToFavorites = (
  product: Product,
): { favorites: Product[]; isActive: boolean } => {
  const stored = localStorage.getItem('favorites');
  let favorites: Product[] = stored ? JSON.parse(stored) : [];

  const exists = favorites.some(p => p.id === product.id);

  if (exists) {
    favorites = favorites.filter(p => p.id !== product.id);
  } else {
    favorites = [...favorites, product];
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));
  window.dispatchEvent(new Event('storage'));

  return { favorites, isActive: !exists };
};
