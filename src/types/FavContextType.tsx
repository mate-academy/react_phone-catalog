import { Product } from './Product';

export type FavContextType = {
  favProducts: Product[],
  setFavProducts: (products: Product[]) => void,
  addToFav: (product: Product) => void,
};
