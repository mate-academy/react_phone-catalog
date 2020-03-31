import { combineReducers } from 'redux';
import { catalogReducer } from './catalogReducer';
import { basketReducer } from './basketReducer';
import { basketButtonReducer } from './basketButtonReducer';
import { phoneDetailsReducer } from './phoneReducer';
import { errorReducer } from './errorReducer';
import { loadReducer } from './loadReducer';

export const rootReducer = combineReducers({
  catalogReducer,
  basketReducer,
  basketButtonReducer,
  phoneDetailsReducer,
  errorReducer,
  loadReducer,
});
