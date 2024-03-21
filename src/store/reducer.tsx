import { Product } from '../type/Product';
import { State } from '../type/State';

export type Action =
  | { type: 'showMenu'; payload: boolean }
  | { type: 'hieghtFooter'; payload: number }
  | { type: 'hieghtHeader'; payload: number }
  | { type: 'isLoading'; payload: boolean }
  | { type: 'addFavourites'; payload: string }
  | { type: 'deleteFavourites'; payload: string }
  | { type: 'getProduts'; payload: Product[] };

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'getProduts':
      return {
        ...state,
        products: action.payload,
      };

    case 'addFavourites':
      return {
        ...state,
        favourites: [
          ...state.favourites,
          state.products.find(pr => pr.itemId === action.payload),
        ],
      };

    case 'deleteFavourites':
      return {
        ...state,
        favourites: state.favourites.filter(
          fav => fav.itemId !== action.payload,
        ),
      };

    case 'hieghtFooter':
      return {
        ...state,
        hieghtFooter: action.payload,
      };

    case 'hieghtHeader':
      return {
        ...state,
        hieghtHeader: action.payload,
      };

    case 'isLoading':
      return {
        ...state,
        loading: action.payload,
      };

    case 'showMenu':
      return {
        ...state,
        isShowMenu: action.payload,
      };

    default:
      return state;
  }
}
