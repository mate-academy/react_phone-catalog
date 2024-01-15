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

export type CartAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string } // Для видалення за ідентифікатором товару
  | { type: 'DECREASE_QUANTITY'; payload: string } // Для зменшення кількості одного товару в корзині
  | { type: 'INCREASE_QUANTITY'; payload: Product } // Для збільшення кількості одного товару в корзині
  | { type: 'CLEAR_CART' }
  | { type: 'SET_QUANTITY'; payload: { productId: string; quantity: number } };

export type CartState = {
  cart: Product[];
};

export const initialState: CartState = {
  cart: [],
};

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
