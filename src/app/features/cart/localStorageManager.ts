import { getLocalStorageManager } from '../../../utils/getLocalStorageManager';
import { State } from './cartSlice';

const LOCALSTORAGE_KEY = 'cart';

export const cartLocalStorageManager =
  getLocalStorageManager<State>(LOCALSTORAGE_KEY);
