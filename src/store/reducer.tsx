import { Product } from '../type/Product';
import { State } from '../type/State';

export type Action =
  | { type: 'showMenu'; payload: boolean }
  | { type: 'getProduts'; payload: Product[] };

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'showMenu':
      return {
        ...state,
        isShowMenu: action.payload,
      };

    case 'getProduts':
      return {
        ...state,
        products: action.payload,
      };

    default:
      return state;
  }
}
