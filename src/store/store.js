import { createStore } from 'redux';
import favoritesReducer from './favoritesReducer';

const store = createStore(favoritesReducer);

export default store;
