import { createStore, combineReducers, applyMiddleware } from 'redux';
import middlewareThunk from 'redux-thunk';
import { phonesReducer } from './reducers/phonesReducer';
import { phoneDetailsReducer } from './reducers/phoneDetailsReducer';
import { cartReducer } from './reducers/cartReducer';

const reducers = combineReducers({
  phonesPage: phonesReducer,
  phoneDetailsPage: phoneDetailsReducer,
  cartPage: cartReducer,
});

export const store = createStore(reducers, applyMiddleware(middlewareThunk));

window.store = store;
