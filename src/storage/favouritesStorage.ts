import { Product } from '@src/types/Product';

export const loadFavourites = (): Product[] => {
  const saved = localStorage.getItem('favourites');

  return saved ? JSON.parse(saved) : [];
};

export const savedFavourites = (items: Product[]) => {
  localStorage.setItem('favourites', JSON.stringify(items));
};
