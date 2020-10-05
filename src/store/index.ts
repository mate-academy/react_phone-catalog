import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Dispatch } from 'react';
import thunk from 'redux-thunk';

import { fetchGoods, fetchGoodDetails } from '../helpers/api'
import loadingReducer, { startLoading, finishLoading, setLoaded } from './loading';
import errorReducer, { setErrorMessage } from './error';
import goodsReducer, { setGoods } from './goods';
import detailsReducer, { setGoodDetails } from './details';
import favouritesReducer from './favourites';
import cartReducer from './cart';

export type RootState = ReturnType<typeof rootReducer>;

export const isLoading = (state: RootState) => state.loading.isLoading;
export const isLoaded = (state: RootState) => state.loading.isLoaded;
export const getErrorMessage = (state: RootState) => state.errorMessage;
export const getGoods = (state: RootState) => state.goods;
export const getFavouritesGoods = (state: RootState) => state.favourites;
export const getCartGoods = (state: RootState) => state.cart;
export const getGoodDetails = (state: RootState) => state.details;

export const loadGoods = () => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(startLoading());

    try {
      const goods = await fetchGoods();
      dispatch(setGoods(goods));
      dispatch(setLoaded());
    } catch (e) {
      dispatch(setErrorMessage(`Sorry, something is wrong: ${e}`));
    }
    dispatch(finishLoading());
  }
}

export const loadGoodDetails = (goodId: string) => {
  return async (dispatch: Dispatch<any>) => {

    try {
      const good = await fetchGoodDetails(goodId);
      dispatch(setGoodDetails(good));

    } catch (e) {
      dispatch(setErrorMessage(`Sorry, something is wrong: ${e}`));
    }
  }
}

const rootReducer = combineReducers({
  loading: loadingReducer,
  errorMessage: errorReducer,
  goods: goodsReducer,
  favourites: favouritesReducer,
  cart: cartReducer,
  details: detailsReducer,
})


const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)));

export default store;
