import { Product } from '../../../types/CategoriesTypes/Product';
import { Favourites } from './Favourites';

export interface FavouritesContextType {
  favourites: Favourites;
  getIsInFavourites: (itemId: string) => boolean;
  likeHandler: (itemId: string, props: Product) => void;
}
