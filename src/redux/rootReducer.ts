import { Reducer } from 'redux';
import { Actions, ActionTypes } from '../types/actionTypes';
// import { SET_PHONES } from './constants';

const initialState: RootState = {
  isLoading: false,
  isLoaded: false,
  phones: [],
};

export const rootReducer: Reducer<RootState, Actions> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case ActionTypes.SET_PHONES:
      return {
        ...state,
        phones: action.payload,
      };
    case ActionTypes.SET_IS_LOADED:
      return {
        ...state,
        isLoaded: action.payload,
      };
    case ActionTypes.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};
