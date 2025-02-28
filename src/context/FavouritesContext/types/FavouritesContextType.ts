// eslint-disable-next-line max-len
import { Product } from '../../../modules/HomePage/components/Models/components/Main/components/Model/types/Product';
import { Favourites } from './Favourites';

export interface FavouritesContextType {
  favourites: Favourites;
  getIsIncluded: (itemId: string) => boolean;
  onClickHandler: (itemId: string, props: Product) => void;
}
