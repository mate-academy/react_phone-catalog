import {
  ActionTypes,
  SetPhonesAction,
  SetIsLoadingAction,
  SetIsLoadedAction,
} from '../types/actionTypes';

export const setPhonesAction = (phones: Phone[]): SetPhonesAction => ({
  type: ActionTypes.SET_PHONES,
  payload: phones,
});

export const startLoadingAction = (): SetIsLoadingAction => ({
  type: ActionTypes.SET_IS_LOADING,
  payload: true,
});

export const stopLoadingAction = (): SetIsLoadingAction => ({
  type: ActionTypes.SET_IS_LOADING,
  payload: false,
});

export const setIsLoadedAction = (): SetIsLoadedAction => ({
  type: ActionTypes.SET_IS_LOADED,
  payload: true,
});
