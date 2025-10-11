import { CartItem, Item } from './types';

type State = {
  itemsInFav: Item[];
  itemsInCart: CartItem[];
};

const initialState: State = {
  itemsInFav: [],
  itemsInCart: [],
};

const getInit = () => {
  const fav = localStorage.getItem('favorites');
  const cart = localStorage.getItem('cart');

  return {
    itemsInFav: fav ? JSON.parse(fav) : [],
    itemsInCart: cart ? JSON.parse(cart) : [],
  } as State;
};

//typeCheck for SSR
const init = (initialArg: State): State => {
  return typeof localStorage === 'undefined' ? initialArg : getInit();
};

type Action =
  | { type: 'TOGGLE_FAV'; payload: Item }
  | { type: 'UPDATE_CART_ITEM'; payload: CartItem };

const processCart = (array: CartItem[], patchObj: CartItem) => {
  const withoutItem = array.filter(el => el.id !== patchObj.id);

  if (patchObj.amount === 0) {
    return withoutItem;
  }

  return [...withoutItem, patchObj];
};

function appReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'TOGGLE_FAV':
      return {
        ...state,
        itemsInFav: state.itemsInFav.some(el => el.id === action.payload.id)
          ? state.itemsInFav.filter(el => el.id !== action.payload.id)
          : [...state.itemsInFav, action.payload],
      };
    case 'UPDATE_CART_ITEM':
      return {
        ...state,
        itemsInCart: processCart(state.itemsInCart, action.payload),
      };
    default:
      return state;
  }
}

export { appReducer, initialState, init };
