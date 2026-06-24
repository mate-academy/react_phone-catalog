import { FavoritesContextActionType } from './FavoritesContextActionType';
import { Product } from '../shared/types';

export type FavoritesContextAction =
  | { type: FavoritesContextActionType.TOGGLE_FAVORITE; payload: Product }
  | { type: FavoritesContextActionType.ADD_FAVORITES; payload: Product[] };
