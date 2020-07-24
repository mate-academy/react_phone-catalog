import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import phonesReducer from './phones';
import screenSizeReducer from './screenSize';
import basketReducer from './basket';
export type RootState = ReturnType<typeof rootReducer>;

export const getPhones = (state: RootState) => state.phones;
export const getScreen = (state: RootState) => state.screen;
export const getBasket = (state: RootState) => state.basketItems;

const rootReducer = combineReducers({
  phones: phonesReducer,
  screen: screenSizeReducer,
  basketItems: basketReducer,
});

const store = createStore(
  rootReducer,
 composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
