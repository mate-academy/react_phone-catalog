import { getLocalStorageManager } from '../../../utils/getLocalStorageManager';
import { State } from './favouritesSlice';

const LOCALSTORAGE_KEY = 'favourites';

export const favouriteLocalStorageManager =
  getLocalStorageManager<State>(LOCALSTORAGE_KEY);
