import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import phonesReducer from './phones';
import screenSizeReducer from './screenSize';
import basketReducer from './basket';
import favoriteReducer from './favorite';

const rootReducer = combineReducers({
  products: phonesReducer,
  screen: screenSizeReducer,
  basketItems: basketReducer,
  favoriteItems: favoriteReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const getFavorite = (state: RootState) => state.favoriteItems;
export const getProducts = (state: RootState) => state.products;
export const getScreen = (state: RootState) => state.screen;
export const getBasket = (state: RootState) => state.basketItems;

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
