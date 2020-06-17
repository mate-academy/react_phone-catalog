import { createStore, combineReducers } from 'redux';
import queryReducer from './query';
import goodReducer from './good';

export const getQuery = (state: RootState) => state.query;

export const getGoods = (state: RootState) => state.goods;

export const getVisibleGoods = (state: RootState) => state.goods.filter(g => g.name.includes(state.query));

export const getPhones = (state: RootState) => state.goods.filter(good => good.type === 'phone');

export const getTablets = (state: RootState) => state.goods.filter(good => good.type === 'tablet');

//export const getTablets = (state: RootState) => state.goods.filter(good => good.type === 'tablet');



const rootReducer = combineReducers({
  goods: goodReducer,
  query: queryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store;
