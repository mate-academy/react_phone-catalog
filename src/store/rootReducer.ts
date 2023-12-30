import { combineReducers } from 'redux';
import cartReducer from '../features/cartSlice';
import favouriteReducer from '../features/favouriteSlice';
import productsReducer from '../features/productsSlice';
import selectedProductReducer from '../features/selectedProductSlice';
import queryReducer from '../features/querySlice';

const rootReducer = combineReducers({
  cartedProducts: cartReducer,
  favouriteProducts: favouriteReducer,
  products: productsReducer,
  selectedProduct: selectedProductReducer,
  query: queryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
