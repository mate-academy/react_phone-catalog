import { createStore, combineReducers, applyMiddleware } from 'redux';
import middlewareThunk from 'redux-thunk';
import { phonesReducer } from './reducers/phonesReducer';

const reducers = combineReducers({
  phonesPage: phonesReducer,
});

export const store = createStore(reducers, applyMiddleware(middlewareThunk));

window.store = store;
