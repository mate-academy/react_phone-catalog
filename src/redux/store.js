import { createStore, combineReducers } from 'redux';
import { phonesReducer } from './reducers/phonesReducer';

const reducers = combineReducers({
  phonesPage: phonesReducer,
});

export const store = createStore(reducers);

window.store = store;
