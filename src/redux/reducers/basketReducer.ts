import { AnyAction } from 'redux';
import { type } from '../actions';

const basketState: BasketState = {
  basket: [],
};

export const basketReducer = (
  state = basketState, action: AnyAction,
): BasketState => {
  switch (action.type) {
    case type.SET_BASKET:
      return {
        basket: action.basket,
      };

    default:
      return state;
  }
};
