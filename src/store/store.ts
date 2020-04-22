import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { phonesReducer } from './Reducer';

export const store = createStore(
  phonesReducer,
  applyMiddleware(thunk),
);
