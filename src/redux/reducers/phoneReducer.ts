import { AnyAction } from 'redux';
import { type } from '../actions';

const phoneDetailsState: PhoneDetailsState = {
  phone: null,
};

export const phoneDetailsReducer = (
  state = phoneDetailsState, action: AnyAction,
): PhoneDetailsState => {
  switch (action.type) {
    case type.SET_PHONE_DETAILS:
      return {
        phone: action.phone,
      };

    default:
      return state;
  }
};
