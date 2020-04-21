import { Action } from 'redux';

export enum ActionTypes {
  SET_PHONES = 'SET_PHONES',
  SET_IS_LOADED = 'SET_IS_LOADED',
  SET_IS_LOADING = 'SET_IS_LOADING',
}

export interface MyAction<T = ActionTypes, P = null> extends Action<T> {
  payload: P;
}

export type SetPhonesAction = MyAction<ActionTypes.SET_PHONES, Phone[]>;

export type SetIsLoadedAction = MyAction<ActionTypes.SET_IS_LOADED, boolean>;

export type SetIsLoadingAction = MyAction<ActionTypes.SET_IS_LOADING, boolean>;

export type Actions = SetPhonesAction
| SetIsLoadedAction
| SetIsLoadingAction;
