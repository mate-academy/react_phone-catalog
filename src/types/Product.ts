export interface Product {
  age: number,
  type: string,
  carrier: string,
  id: string,
  imageUrl: string,
  name: string,
  snippet: string,
  price: number,
  discount: number,
  screen: string,
  capacity: string,
  ram: string,
}

export type FavouritesAction =
  | { type: 'ADD_TO_FAV'; payload: Product }
  | { type: 'REMOVE_FROM_FAV'; payload: Product };

export interface FavouritesState {
  favourites: Product[];
}

export interface FavouritesContextType {
  favourites: Product[];
  handleToggleFav: (product: Product) => void;
}
