import { combineReducers } from 'redux';
import cartReducer from '../features/cartSlice';
import favouriteReducer from '../features/favouriteSlice';
import selectedProductReducer from '../features/selectedProductSlice';
import queryReducer from '../features/querySlice';
import productsReducer from '../features/productsSlice';
import modalReducer from '../features/modalSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  favouriteProducts: favouriteReducer,
  selectedProduct: selectedProductReducer,
  query: queryReducer,
  modal: modalReducer,
  products: productsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
