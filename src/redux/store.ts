import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './rootReducer/rootReducer';
import { composeEnhancers } from './composeEnhancer';

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
);

export const store = createStore(rootReducer, enhancer);
