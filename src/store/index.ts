import { createStore, combineReducers } from 'redux';

import goodReducer from './good';

export const getGoods = (state: RootState) => state.goods;

export const getPhones = (state: RootState) => state.goods.filter(good => good.type === 'phone');

export const getTablets = (state: RootState) => state.goods.filter(good => good.type === 'tablet');

const rootReducer = combineReducers({
  goods: goodReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store;
