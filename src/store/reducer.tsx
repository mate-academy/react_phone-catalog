import { Product } from '../type/Product';
import { State } from '../type/State';

export type Action =
  | { type: 'showMenu'; payload: boolean }
  | { type: 'hieghtFooter'; payload: number }
  | { type: 'hieghtHeader'; payload: number }
  | { type: 'isLoading'; payload: boolean }
  | { type: 'reload'; payload: boolean }
  | { type: 'getFavourites'; payload: Product[] }
  | { type: 'addFavourites'; payload: string }
  | { type: 'deleteFavourites'; payload: string }
  | { type: 'getCart'; payload: Product[] }
  | { type: 'addToCart'; payload: string }
  | { type: 'deleteFromCart'; payload: string }
  | { type: 'increaseQuantity'; payload: string }
  | { type: 'decreaseQuantity'; payload: string }
  | { type: 'errorMessage'; payload: string }
  | { type: 'getProduts'; payload: Product[] };

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'getProduts':
      const newProducts = action.payload.map(pr => ({ ...pr, quantity: 1 }));

      return {
        ...state,
        products: newProducts,
      };

    case 'errorMessage':
      return {
        ...state,
        errorMessage: action.payload,
      };

    case 'increaseQuantity':
      return {
        ...state,
        cart: state.cart.map(prod => {
          if (prod.itemId === action.payload) {
            return {
              ...prod,
              quantity: prod.quantity + 1,
            };
          }

          return prod;
        }),
      };

    case 'decreaseQuantity':
      return {
        ...state,
        cart: state.cart.map(prod => {
          if (prod.itemId === action.payload) {
            return {
              ...prod,
              quantity: prod.quantity - 1,
            };
          }

          return prod;
        }),
      };

    case 'addToCart':
      const findItem = state.products.find(pr => pr.itemId === action.payload);

      return {
        ...state,
        cart: findItem ? [...state.cart, findItem] : state.cart,
      };

    case 'deleteFromCart':
      return {
        ...state,
        cart: state.cart.filter(c => c.itemId !== action.payload),
      };

    case 'getCart':
      return {
        ...state,
        cart: action.payload,
      };

    case 'addFavourites':
      const findItemFav = state.products.find(
        pr => pr.itemId === action.payload,
      );

      return {
        ...state,
        favourites: findItemFav
          ? [...state.favourites, findItemFav]
          : state.favourites,
      };

    case 'deleteFavourites':
      return {
        ...state,
        favourites: state.favourites.filter(
          fav => fav.itemId !== action.payload,
        ),
      };

    case 'getFavourites':
      return {
        ...state,
        favourites: action.payload,
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

    case 'reload':
      return {
        ...state,
        reload: action.payload,
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
