import { StateType } from '../../types';

export const initialState: StateType = {
  products: [],
  isLoading: true,
  errorMessage: '',
  favorites: [],
  cart: [],
  setFavorites: () => { },
  setCart: () => { },
};
