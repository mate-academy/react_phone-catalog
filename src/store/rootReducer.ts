import { combineReducers } from 'redux';
import { phoneReducer } from './reducers/phoneReducer';
import { favouritesReducer } from './reducers/favouritesReducer';
import { loadingReducer } from './reducers/loadingReducer';
import { cartReducer } from './reducers/cartReducer';

export const rootReducer = combineReducers({
  phoneReducer,
  favouritesReducer,
  loadingReducer,
  cartReducer,
});
