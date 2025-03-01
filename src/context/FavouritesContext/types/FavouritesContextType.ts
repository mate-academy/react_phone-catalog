import { Product } from '../../../types/CategoriesTypes/Product';
import { Favourites } from './Favourites';

export interface FavouritesContextType {
  favourites: Favourites;
  getIsIncluded: (itemId: string) => boolean;
  likeHandler: (itemId: string, props: Product) => void;
}
