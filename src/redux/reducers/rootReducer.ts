import { combineReducers } from 'redux';
import { catalogReducer } from './catalogReducer';
import { basketReducer } from './basketReducer';
import { basketButtonReducer } from './basketButtonReducer';

export const rootReducer = combineReducers({
  catalogReducer,
  basketReducer,
  basketButtonReducer,
});
