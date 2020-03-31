import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers/rootReducer';

export const store = createStore(rootReducer, applyMiddleware(thunk));
