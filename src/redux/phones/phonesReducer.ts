import { Reducer } from 'redux';
import { ActionType } from '../../utils/constants';

const initialState = {
  phones: [],
  isLoading: false,
};

export const phonesReducer: Reducer = (
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
        phones: payload.phones,
        isLoading: false,
      };
    default:
      return state;
  }
};
