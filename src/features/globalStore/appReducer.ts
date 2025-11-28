import { CartItem, Item } from './types';

type State = {
  itemsInFav: Item[];
  itemsInCart: CartItem[];
  modalIsOpened: boolean;
};

const initialState: State = {
  itemsInFav: [],
  itemsInCart: [],
  modalIsOpened: false,
};

const getInit = () => {
  const fav = localStorage.getItem('favorites');
  const cart = localStorage.getItem('cart');

  return {
    itemsInFav: fav ? JSON.parse(fav) : [],
    itemsInCart: cart ? JSON.parse(cart) : [],
    modalIsOpened: false,
  } as State;
};

//typeCheck for SSR
const init = (initialArg: State): State => {
  return typeof localStorage === 'undefined' ? initialArg : getInit();
};

type Action =
  | { type: 'TOGGLE_FAV'; payload: Item }
  | { type: 'UPDATE_CART_ITEM'; payload: CartItem }
  | { type: 'TOGGLE_MODAL' };

const processCart = (array: CartItem[], patchObj: CartItem) => {
  if (patchObj.amount === 0) {
    return array.filter(el => el.id !== patchObj.id);
  }

  const exists = array.some(el => el.id === patchObj.id);

  if (exists) {
    return array.map(el => (el.id === patchObj.id ? patchObj : el));
  } else {
    return [...array, patchObj];
  }
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
    case 'TOGGLE_MODAL':
      return {
        ...state,
        modalIsOpened: !state.modalIsOpened,
      };
    default:
      return state;
  }
}

export { appReducer, initialState, init };
