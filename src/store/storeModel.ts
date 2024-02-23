import { Action } from 'redux';

// import { asyncReducers } from 'react-redux-help-kit'
import { rootReducer } from './store';

export type Reducer<TState, TAction extends Action> = (
  state: TState | undefined,
  action: TAction,
) => TState;

export type StateType<TReducerOrMap extends any> =
  TReducerOrMap extends Reducer<any, any>
    ? ReturnType<TReducerOrMap>
    : TReducerOrMap extends Record<any, any>
      ? {
        [K in keyof TReducerOrMap]: StateType<TReducerOrMap[K]>
      }
      : never;

export type StoreModel = StateType<typeof rootReducer>;
