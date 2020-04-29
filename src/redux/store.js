import { createStore, combineReducers, applyMiddleware } from 'redux';
import middlewareThunk from 'redux-thunk';
import { phonesReducer } from './reducers/phonesReducer';
import { phoneDetailsReducer } from './reducers/phoneDetailsReducer';

const reducers = combineReducers({
  phonesPage: phonesReducer,
  phoneDetailsPage: phoneDetailsReducer,
});

export const store = createStore(reducers, applyMiddleware(middlewareThunk));

window.store = store;
