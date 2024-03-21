import { Item, Store } from './Store';

export type FavoriteItem = Item;

export class FavoritesClass extends Store<FavoriteItem> {
  constructor() {
    super('favorites');
  }
}

export const Favorites = new FavoritesClass();
