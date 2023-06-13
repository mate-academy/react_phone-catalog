import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import cartReducer from '../features/cartReducer';

const reducer = combineReducers({
  cartItems: cartReducer,
})

export const store = createStore(reducer, composeWithDevTools());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
