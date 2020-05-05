/* eslint-disable no-case-declarations */
import { getPhones } from '../../api/api';
import {
  SET_PHONES,
  TOGGLE_IS_FETCHING,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADD_QUANTITY,
  SUBSTRACT_QUANTITY,
  ADD_TO_FAVORITES,
} from './constants';
import { setPhonesAC, toggleIsFetchingAC } from './actionCreators';

const initialState = {
  phones: [],
  isFetching: false,
  addedPhones: [],
  favoritePhones: [],
  totalPrice: 0,
  itemPrice: 199,
  totalCount: 0,
};

export const phonesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PHONES:
      return {
        ...state,
        phones: [...action.phones],
      };

    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case ADD_TO_CART:
      const addedPhone = state.phones
        .find(phone => phone.id === action.id);

      addedPhone.quantity = 1;
      addedPhone.price = 199;

      return {
        ...state,
        addedPhones: [...state.addedPhones, addedPhone],
        totalPrice: state.totalPrice + state.itemPrice,
        totalCount: state.totalCount + 1,
      };

    case REMOVE_FROM_CART:
      const phoneToRemove = state.addedPhones
        .find(phone => action.id === phone.id);
      const withoutRemovedPhone = state.addedPhones
        .filter(phone => action.id !== phone.id);

      return {
        ...state,
        addedPhones: withoutRemovedPhone,
        totalPrice: state.totalPrice - phoneToRemove.price,
        totalCount: state.totalCount - phoneToRemove.quantity,
      };

    case ADD_QUANTITY:
      const addedItem = state.addedPhones
        .find(phone => phone.id === action.id);

      addedItem.quantity += 1;
      addedItem.price += 199;

      return {
        ...state,
        totalPrice: state.totalPrice + state.itemPrice,
        totalCount: state.totalCount + 1,
      };

    case SUBSTRACT_QUANTITY:
      const substractItem = state.addedPhones
        .find(phone => phone.id === action.id);

      substractItem.quantity -= 1;
      substractItem.price -= 199;

      return {
        ...state,
        totalPrice: state.totalPrice - state.itemPrice,
        totalCount: state.totalCount - 1,
      };

    case ADD_TO_FAVORITES:
      const favoritePhone = state.phones
        .find(phone => phone.id === action.id);

      return {
        ...state,
        favoritePhones: [...state.favoritePhones, favoritePhone],
      };

    default:
      return state;
  }
};

export const getPhonesThunkCreator = () => (dispatch) => {
  dispatch(toggleIsFetchingAC(true));

  getPhones()
    .then(data => {
      dispatch(toggleIsFetchingAC(false));
      dispatch(setPhonesAC(data));
    });
};
