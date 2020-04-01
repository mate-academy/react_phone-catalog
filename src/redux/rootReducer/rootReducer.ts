import { combineReducers } from 'redux';
import { phonesReducer } from '../phones/phonesReducer';
import { phoneDetailReducer } from '../phoneDetail/phoneDetailReducer';

export const rootReducer = combineReducers({
  phones: phonesReducer,
  phoneDetail: phoneDetailReducer,
});
