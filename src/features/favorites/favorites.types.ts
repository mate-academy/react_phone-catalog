import { NormalizedProduct } from 'shared/helpers/normalizeProductType';

export type FavoriteItem = NormalizedProduct;

export interface FavoritesState {
  FavoriteItems: FavoriteItem[];
}
