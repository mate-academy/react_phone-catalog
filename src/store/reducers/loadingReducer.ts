import { AnyAction } from 'redux';
import { ActionTypes } from '../actionTypes';
import { LoadState } from '../../constants/types';

export const loadingState: LoadState = {
  isLoadingPhones: false,
  isLoadingDetails: false,
};

export const getIsLoadingPhones = (state: LoadState) => state.isLoadingPhones;
export const getIsLoadingDetails = (state: LoadState) => state.isLoadingDetails;

export const loadingReducer = (
  state = loadingState, action: AnyAction,
) => {
  switch (action.type) {
    case ActionTypes.SET_LOADING_PHONES:
      return {
        ...state,
        isLoadingPhones: action.payload,
      };

    case ActionTypes.SET_LOADING_DETAILS:
      return {
        ...state,
        isLoadingDetails: action.payload,
      };

    default:
      return state;
  }
};
