import { BaseProduct } from '@shared/types/APIReturnTypes';
import { ItemsAmount, Order } from '@shared/types/filterTypes';

type State = {
  items: BaseProduct[];
  order: Order;
  itemsOnPage: ItemsAmount;
  page: number;
};

export const initialState: State = {
  items: [],
};

type Action =
  | { type: 'SET_ITEMS'; payload: BaseProduct[] }
  | { type: 'SET_ORDER'; payload: Order }
  | { type: 'SET_ITEMS_ON_PAGE'; payload: ItemsAmount }
  | { type: 'SET_PAGE'; payload: number };

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_ITEMS':
      return {
        ...state,
        items: action.payload,
      };
    case 'SET_ORDER':
      return {
        ...state,
        order: action.payload,
      };
    case 'SET_ITEMS_ON_PAGE':
      return {
        ...state,
        itemsOnPage: action.payload,
      };
    case 'SET_PAGE':
      return {
        ...state,
        page: action.payload,
      };
    default:
      return state;
  }
}
