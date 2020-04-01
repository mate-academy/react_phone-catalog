import { Reducer } from 'redux';
import { ActionType } from '../../utils/constants';

const initialState = {
  phoneDetail: {},
  isLoading: false,
};

export const phoneDetailReducer: Reducer = (
  state = initialState,
  { type, payload },
) => {
  switch (type) {
    case ActionType.FETCH_PHONES_START:
      return {
        ...state,
        isLoading: true,
      };
    case ActionType.FETCH_PHONES_SUCCESS:
      return {
        phoneDetail: payload.phone,
        isLoading: false,
      };
    default:
      return state;
  }
};
