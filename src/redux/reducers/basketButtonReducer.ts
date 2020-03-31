import { AnyAction } from 'redux';
import { type } from '../actions';

const basketBattonState: BasketButtonState = {
  isOpened: false,
};

export const basketButtonReducer = (
  state = basketBattonState, action: AnyAction,
): BasketButtonState => {
  switch (action.type) {
    case type.SET_IS_OPENED_BASKET:
      return {
        isOpened: !state.isOpened,
      };

    default:
      return state;
  }
};
