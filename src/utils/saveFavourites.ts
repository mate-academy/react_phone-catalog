import { Product } from '../types/Product';

export const saveFavourites = (
  key: string,
  fovourites: Product[],
) => {
  return localStorage.setItem(key, JSON.stringify(fovourites));
};
