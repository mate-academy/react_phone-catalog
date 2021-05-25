import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Dispatch } from 'react';

import { goodsReducer, actions as goodsActions, goodsActionType } from './goods';
import { goodDetailsReducer, actions as goodDetailsActions, goodDetailsActionType } from './goodDetails';
import { getProducts } from '../api/getProducts';
import { getProduct } from '../api/getProduct';
import { loadingReducer, actions as loadingActions, loadingActionType } from './loading';
import { cartReducer } from './cart';
import { favouritesReducer } from './favourites';

const rootReducer = combineReducers({
  goods: goodsReducer,
  goodDetails: goodDetailsReducer,
  isLoading: loadingReducer,
  cart: cartReducer,
  favourites: favouritesReducer,
});

type RootState = ReturnType<typeof rootReducer>;

export const getGoods = (state: RootState) => state.goods;
export const getGoodDetails = (state: RootState) => state.goodDetails;
export const getCartGoods = (state: RootState) => state.cart;
export const getFavouritesGoods = (state: RootState) => state.favourites;
export const getLoadingStatus = (state: RootState) => state.isLoading;

export const loadGoods = () => {
  return async (dispatch: Dispatch<goodsActionType | loadingActionType>) => {
    dispatch(loadingActions.start());
    const goods = await getProducts();

    dispatch(goodsActions.set(goods));
    dispatch(loadingActions.finish());
  };
};

export const loadGoodDetails = (productId: string) => {
  return async (
    dispatch: Dispatch<goodDetailsActionType | loadingActionType>,
  ) => {
    dispatch(loadingActions.start());
    const good = await getProduct(productId);

    dispatch(goodDetailsActions.set(good));
    dispatch(loadingActions.finish());
  };
};

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
