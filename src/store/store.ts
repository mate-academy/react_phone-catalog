import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './rootReducer';
import { composeEnhancers } from './composeEnhancers';

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(
  rootReducer,
  enhancer,
);
